import {useMainStore} from "~/stores/main";

export const useBookingStore = defineStore("bookingStore", () => {
    const supabaseClient = useSupabaseClient();
    const bookingCompany = ref();
    const currentBookings = ref([]);
    const availableTimes = ref([]);
    const selectedTime = ref('')
    const selectedService = ref([]);
    const selectedDate = ref(new Date());

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

    const calculateAvailableTimes = ({selectedDate, bookedTimes, serviceDuration}) => {

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
            // calculateAvailableTimes({ selectedDate, bookedTimes: allBookings, serviceDuration })
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
        getBookingCompany,
        getBookingsByDate,
    }

})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useBookingStore, import.meta.hot));
}
