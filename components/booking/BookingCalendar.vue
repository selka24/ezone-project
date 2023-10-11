<template>
    <div class="w-full">
        <client-only>
            <VDatePicker
                :expanded="true"
                mode="date"
                transparent
                color="pink"
                view="weekly"
                :min-date="new Date()"
                :borderless="true"
                v-model="selectedDate"
            >
                <template #header-title="info">
                   {{selectedDate ? useFormatDate(selectedDate) : info.title}}
                </template>
                <template #footer>
                    <div class="pt-14">
                        <button class="btn btn-primary" @click="handleGetBookingsByDate">Shiko Oraret</button>
                    </div>
                </template>
            </VDatePicker>
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
        let sDuration = serviceDuration.split(':');
        let sDM = (+sDuration[0]) * 60 + (+sDuration[1]);
        const companyInterval = 15;
        let startOfDay = new Date(selectedDate);
        const today = new Date();
        startOfDay.setHours(0,0,0,0);
        today.setHours(0,0,0,0);
        const compare = compareAsc(startOfDay, today);
        if(compare === 1){ //
            startOfDay.setHours(9, 0, 0, 0);
        } else if(compare === 0) {
            startOfDay = roundToNearestMinutes(new Date(), {nearestTo: companyInterval, roundingMethod: 'ceil'});
        }


        const endOfDay = new Date(selectedDate);
        endOfDay.setHours(23, 45, 0, 0);

        // Initialize available times as the entire day
        // const availableTimes = [{ start_time: startOfDay, end_time: endOfDay }];

        // Convert booked times to Date objects
        const bookedTimeRanges = bookingStore.currentBookings.map((booking) => ({
            start_time: new Date(booking.start_time),
            end_time: new Date(booking.end_time),
        }));

        //when generating available times currStartTime keeps track
        //of the start time being generated so it can stop the while
        // loop if it reaches the end of day
        let currStartTime = startOfDay;
        //company interval is the interval between one hour that the company wants to be booked
        //e.g. if cI = 30min, times available for booking will be *:00 and *:30 not *:10 or smth else
        const timesForBook = [];

        // let test = new Date();
        // test.setHours(9, 30, 0, 0)
        // console.log(new Date(currStartTime.getTime() + (sDM * 60000)), 'currStartTime', sDM);
        // console.log(currStartTime, 'asdfafreg');
        // console.log(roundToNearestMinutes(test, {nearestTo: 30, roundingMethod: 'ceil'}), 'roundToNearestMinutes');
        while(currStartTime.getTime() + (sDM * 60000) <= endOfDay.getTime()){
            const currEndTime =  new Date(currStartTime.getTime() + (sDM * 60000));
            // console.log(currEndTime, 'currEndTime');
            // console.log(currStartTime, 'currStartTime');
            const possibleBookTime = {
                start_time: currStartTime,
                end_time: currEndTime
            }

            if(!bookedTimeRanges.length){
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
                        // timesForBook.push({
                        //     // end_time: possibleBookTime.end_time,
                        //     // start_time: possibleBookTime.start_time,
                        //     start_time: format(possibleBookTime.start_time, 'HH:mm'),
                        //     end_time: format(possibleBookTime.end_time, 'HH:mm')
                        // });
                        currStartTime = add(currStartTime, {minutes: companyInterval});
                        // roundToNearestMinutes(currEndTime, {nearestTo: companyInterval, roundingMethod: 'ceil'});
                    }
                }
            }
        }


        // console.log({bookedTimeRanges})
        // // Iterate through booked times and adjust available times accordingly
        // for (const bookedTime of bookedTimeRanges) {
        //     const newAvailableTimes = [];
        //
        //     for (const availableTime of availableTimes) {
        //         const start = new Date(availableTime.start_time);
        //         const end = new Date(availableTime.end_time);
        //
        //         while (start.getTime() + serviceDuration * 60000 <= end.getTime()) {
        //             // Create a new available time slot with the adjusted start and end times
        //             const adjustedEndTime = new Date(start.getTime() + serviceDuration * 60000);
        //             newAvailableTimes.push({
        //                 start_time: new Date(start),
        //                 end_time: adjustedEndTime,
        //             });
        //
        //             // Move the start time forward by 30 minutes
        //             start.setTime(adjustedEndTime.getTime() + 30 * 60000);
        //         }
        //     }
        //
        //     availableTimes.length = 0; // Clear the existing available times
        //     availableTimes.push(...newAvailableTimes);
        // }
        //
        // // Convert the Date objects in available times back to ISO strings
        // const availableTimesISO = availableTimes.map((time) => ({
        //     start_time: time.start_time.toISOString(),
        //     end_time: time.end_time.toISOString(),
        // }));
        //
        bookingStore.availableTimes = timesForBook;
        return timesForBook;
    }

    // watch(selectedDate, (newValue) => {
    //     console.log(newValue, 'updateeee')
    //     if(newValue) {
    //         getBookingsByDate();
    //     }
    // })
    // const kalendar = ref(null);
    // const key = ref(1)
    // const dayClickEvent = (info) => {
    //     date.value = info.date;
    //     console.log({info})
    // }
    //
    // const move = async () => {
    //     const dayOfWeek = date.value.getDay();
    //     console.log({dayOfWeek})
    //     if(dayOfWeek === 6){
    //         await kalendar.value?.moveBy(1, {transition: 'slide-h'});
    //         // await kalendar.value?.moveNext();
    //         // setTimeout(() => {
    //         //     update();
    //         // },200)
    //         update();
    //         key.value++;
    //     } else {
    //         update();
    //     }
    // }
    //
    // const update = () => {
    //     const tomorrow = new Date();
    //     const nextDay = date.value.getDate() + 1;
    //     tomorrow.setDate(nextDay);
    //     console.log({tomorrow})
    //     date.value = tomorrow;
    // }
</script>

<style>
.vc-pink{
    --vc-accent-600: #e96d7b;
    --vc-white: #323232;
}
</style>
