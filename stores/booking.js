import {add, startOfDay, parse, areIntervalsOverlapping, compareAsc, format, roundToNearestMinutes} from "date-fns";
import { ca } from "date-fns/locale";
import {useFormatDate} from "~/helpers/utilites";

export const useBookingStore = defineStore("bookingStore", () => {
    const mainStore = useMainStore();
    const supabaseClient = useSupabaseClient();
    const bookingCompany = ref();
    const currentBookings = ref([]);
    const availableTimes = ref([]);
    const selectedTime = ref('')
    const selectedService = ref([]);
    const selectedDate = ref(null);
    const selectedEmployee = ref(null)
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

        const companyInterval = 30;
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
            employee_id: booking.employee_id
        }));

        console.log(bookedTimeRanges, 'bookedTimeRanges')

        //when generating available times [currStartTime] keeps track
        //of the start time being generated so it can stop the while
        // loop if it reaches the end of day
        let currStartTime = startOfDay;
        //company interval is the interval between one hour that the company wants to be booked
        //e.g. if cI = 30min, times available for booking will be *:00 and *:30 not *:10 or smth else

        let sDuration = serviceDuration.split(':');
        let sDM = (+sDuration[0]) * 60 + (+sDuration[1]); //convert duration to minutes
        console.log({sDM})

        const noBookings = !bookedTimeRanges.length;

        const timesForBook = [];
        const busEmpl = mainStore.businessEmployees.map(e => e.user_id)
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


            const formatClock = `${format(possibleBookTime.start_time, 'HH:mm')} - ${format(possibleBookTime.end_time, 'HH:mm')}`;
            // const formatClock = `${possibleBookTime.start_time} - ${possibleBookTime.end_time}`;
            const times = {
                start_time: possibleBookTime.start_time,
                end_time: possibleBookTime.end_time,
            }

            if(noBookings){ // if there are no bookings at all add the possible time directly
                timesForBook.push({
                    clock: formatClock,
                    times,
                    availableEmpl: busEmpl
                })
                currStartTime = add(currStartTime, {minutes: companyInterval});
            } else {
                const currTimeBusyEmpl = [];
                let hasOverlap = false;
                for(const bookedTime of bookedTimeRanges){
                    if(
                        areIntervalsOverlapping(
                            {start: possibleBookTime.start_time, end: possibleBookTime.end_time},
                            {start: bookedTime.start_time, end: bookedTime.end_time}
                        )
                    ){
                        console.log(
                            'possible',
                            {start: possibleBookTime.start_time, end: possibleBookTime.end_time},
                            'current',
                            {start: bookedTime.start_time, end: bookedTime.end_time}
                            )
                        hasOverlap = true;
                        // currStartTime = roundToNearestMinutes(bookedTime.end_time, {nearestTo: companyInterval, roundingMethod: 'ceil'});
                        currTimeBusyEmpl.push(bookedTime.employee_id)
                    }
                    // else {
                    //     timesForBook.push(`${format(possibleBookTime.start_time, 'HH:mm')} - ${format(possibleBookTime.end_time, 'HH:mm')}`)
                    //
                    //     currStartTime = add(currStartTime, {minutes: companyInterval});
                    //     break;
                    // }
                }

                if(!hasOverlap){
                    timesForBook.push({
                        clock: formatClock,
                        times,
                        availableEmpl: busEmpl
                    })
                } else {
                    const filteredEMpl = busEmpl.filter(x => currTimeBusyEmpl.indexOf(x) < 0);
                    console.log('has overlapp', currTimeBusyEmpl)
                    if(filteredEMpl.length > 0){
                        timesForBook.push({
                            clock: formatClock,
                            times,
                            availableEmpl: busEmpl.filter(x => currTimeBusyEmpl.indexOf(x) < 0)
                        })
                    }
                }
            }
            currStartTime = add(currStartTime, {minutes: companyInterval});
        }
        availableTimes.value = timesForBook;
        console.log(timesForBook, ' timesForBook timesForBook')
        // return timesForBook;
    }

    const getBookingsByDate = async ({selectedDate, serviceId, companyId, serviceDuration}) => {
        // const {data, error} = await supabaseClient
        //     .from('services')
        //     .select('duration')
        //     .eq('id', serviceId)
        try {
            const nextDay = add(new Date(selectedDate), {days: 1});
            console.log(nextDay, 'nextDaynextDay')
            const {data: allBookings, error: allBookingsError} = await supabaseClient
                .from('bookings')
                .select('start_time, end_time, employee_id')
                .eq('company_id', companyId)
                .eq('status', 'upcoming') // Optional: Only consider upcoming bookings
                .gte('start_time', selectedDate)
                .lte('end_time', useFormatDate(nextDay));

            if(allBookingsError) throw allBookingsError;
            console.log(allBookings, 'allBookings')
            currentBookings.value = allBookings;
            calculateAvailableTimes(selectedDate, serviceDuration);
        } catch (error) {
            alert(`getBookingsByDate -- ${error.message}`);
        }
    }

    const createBooking = async (newBooking) => {
        try {
            await useFetch('/api/book', {
                method: 'post',
                body: {
                    booking: newBooking
                }
            })
            // const response = await supabaseClient
            // .from('bookings')
            // .insert(newBooking)
        } catch (e) {

        }
    }

    const getMyBooking = async (id) => {
        const response = await supabaseClient
            .from('bookings')
            .select('*, companies (*)')
            .eq('id', id)
    }

    return {
        availableTimes,
        bookingCompany,
        selectedService,
        selectedTime,
        selectedDate,
        selectedEmployee,
        currentBookings,
        bookName,
        bookNumber,
        getBookingCompany,
        getBookingsByDate,
        getMyBooking,
        createBooking
    }

})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useBookingStore, import.meta.hot));
}
