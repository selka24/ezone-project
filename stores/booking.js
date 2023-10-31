import {useMainStore} from "~/stores/main";
import {add, areIntervalsOverlapping, compareAsc, format, roundToNearestMinutes} from "date-fns";

export const useBookingStore = defineStore("bookingStore", () => {
    const supabaseClient = useSupabaseClient();
    const bookingCompany = ref();
    const currentBookings = ref([]);
    const availableTimes = ref([]);
    const selectedTime = ref('')
    const selectedService = ref([]);
    const selectedDate = ref(null);
    const bookName = ref('');
    const bookNumber = ref('');

    const getBookingCompany = async (url) => {
        try {
            const {data: [company], error} = await supabaseClient
                .from('companies')
                .select(`*, services (*), employees (*)`)
                .eq('url', url)
            if(error) throw error;

            console.log({company})

            if(company) {
                bookingCompany.value = company;
            }
        } catch (error) {

        }
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
        const bookedTimeRanges = currentBookings.value.map((booking) => ({
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
        availableTimes.value = timesForBook;
        // return timesForBook;
    }

    const getBookingsByDate = async ({selectedDate, serviceId, companyId, serviceDuration}) => {
        // const {data, error} = await supabaseClient
        //     .from('services')
        //     .select('duration')
        //     .eq('id', serviceId)
        try {
            const {data: allBookings, error: allBookingsError} = await supabaseClient
                .from('bookings')
                .select('start_time, end_time')
                .eq('company_id', companyId)
                .eq('status', 'upcoming') // Optional: Only consider upcoming bookings
                .gte('start_time', selectedDate);

            if(allBookingsError) throw allBookingsError;
            console.log(allBookings, 'allBookings')
            currentBookings.value = allBookings;
            calculateAvailableTimes(selectedDate, serviceDuration);
        } catch (error) {
            alert(`getBookingsByDate -- ${error.message}`);
        }
    }

    return {
        availableTimes,
        bookingCompany,
        selectedService,
        selectedTime,
        selectedDate,
        currentBookings,
        bookName,
        bookNumber,
        getBookingCompany,
        getBookingsByDate,
    }

})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useBookingStore, import.meta.hot));
}
