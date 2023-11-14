<template>
    <div class="w-full">
        <client-only>
            <VDatePicker
                :expanded="true"
                mode="date"
                transparent
                :min-date="new Date()"
                :borderless="true"
                v-model="selectedDate"
            />
<!--                <template #header-title="info">-->
<!--                   {{selectedDate ? useFormatDate(selectedDate) : info.title}}-->
<!--                </template>-->
<!--                <template #footer>-->
<!--                    <div class="pt-14">-->
<!--                        <button class="btn btn-primary" @click="handleGetBookingsByDate">Shiko Oraret</button>-->
<!--                    </div>-->
<!--                </template>-->
        </client-only>
    </div>
</template>
<script setup>
    import {useFormatDate} from "~/helpers/utilites";
    import {useBookingStore} from "~/stores/booking";
    import {useMainStore} from "~/stores/main";
    import {areIntervalsOverlapping, roundToNearestMinutes, format, add, compareAsc} from "date-fns";

    const bookingStore = useBookingStore();
    const mainStore = useMainStore();

    const {selectedDate} = toRefs(bookingStore)
    const handleGetBookingsByDate = async () => {
        console.log(selectedDate.value, 'selectedDate')
        // selectedDate.value.setUTCHours(0,0,0,0)
        const payload = {
            selectedDate: selectedDate.value.toDateString(),
            serviceId: bookingStore.selectedService[0]?.id,
            companyId: mainStore.businessInfo?.id,
            serviceDuration: bookingStore.selectedService[0]?.duration
        }
        console.log(payload)
        await bookingStore.getBookingsByDate(payload);
        console.log('calculate times', calculateAvailableTimes(payload.selectedDate, payload.serviceDuration));
    }

    const calculateAvailableTimes = (selectedDate, serviceDuration) => {

        const companyInterval = 15;
        let startOfDay = new Date(selectedDate);
        const today = new Date();
        startOfDay.setHours(0,0,0,0);
        today.setHours(0,0,0,0);
        const compare = compareAsc(startOfDay, today); //check if the selected day is today
        if(compare === 1){ //if it is after today, set the start hours to the company work time
            startOfDay.setHours(9, 0, 0, 0);
        } else if(compare === 0) { // else set the start time to the current time rounded according to the company interval
            startOfDay = roundToNearestMinutes(new Date(), {nearestTo: companyInterval, roundingMethod: 'ceil'});
        }


        const endOfDay = new Date(selectedDate);
        endOfDay.setHours(23, 45, 0, 0);


        // Convert booked times to Date objects
        const bookedTimeRanges = bookingStore.currentBookings.map((booking) => ({
            start_time: new Date(booking.start_time),
            end_time: new Date(booking.end_time),
        }));

        //when generating available times [currStartTime] keeps track
        //of the start time being generated so it can stop the while
        // loop if it reaches the end of day
        let currStartTime = startOfDay;
        //company interval is the interval between one hour that the company wants to be booked
        //e.g. if cI = 30min, times available for booking will be *:00 and *:30 not *:10 or smth else
        const timesForBook = [];

        let sDuration = serviceDuration.split(':');
        let sDM = (+sDuration[0]) * 60 + (+sDuration[1]);

        while(currStartTime.getTime() + (sDM * 60000) <= endOfDay.getTime()){

            //calculates when will client end the service by getting the currStartTime and
            //adding the duration time
            const currEndTime =  new Date(currStartTime.getTime() + (sDM * 60000));

            //it is possible/not-possible because we don't know yet
            //if the time is booked from another one or not
            const possibleBookTime = {
                start_time: currStartTime,
                end_time: currEndTime
            }


            if(!bookedTimeRanges.length){ // if there are no bookings at all add the possible time directly
                timesForBook.push(`${format(possibleBookTime.start_time, 'HH:mm')} - ${format(possibleBookTime.end_time, 'HH:mm')}`)
                currStartTime = add(currStartTime, {minutes: companyInterval});
            } else {
                for(const bookedTime of bookedTimeRanges){
                    if(areIntervalsOverlapping(
                        {start: possibleBookTime.start_time, end: possibleBookTime.end_time},
                        {start: bookedTime.start_time, end: bookedTime.end_time}
                    )){
                        currStartTime = roundToNearestMinutes(bookedTime.end_time, {nearestTo: companyInterval, roundingMethod: 'ceil'});
                    } else {
                        timesForBook.push(`${format(possibleBookTime.start_time, 'HH:mm')} - ${format(possibleBookTime.end_time, 'HH:mm')}`)

                        currStartTime = add(currStartTime, {minutes: companyInterval});
                    }
                }
            }
        }
        bookingStore.availableTimes = timesForBook;
        return timesForBook;
    }
</script>

<style>
.vc-pink{
    --vc-accent-600: #e96d7b;
    --vc-white: #323232;
}

.vc-day{
    padding-top: 5px;
    padding-bottom: 5px;
}

.vc-weeks{
    margin-top: 10px;
}
</style>
