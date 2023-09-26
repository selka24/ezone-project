export const useBookingStore = defineStore("bookingStore", () => {
    const supabaseClient = useSupabaseClient();
    const bookingCompany = ref();
    const bookings = ref(null);
    const selectedService = ref(null);
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
            const {date: allBookings, error: allBookingsError} = await supabaseClient
                .from('bookings')
                .select('start_time, end_time')
                .eq('service_id', serviceId)
                .eq('company_id', companyId)
                .eq('status', 'upcoming') // Optional: Only consider upcoming bookings
                .eq('start_time', selectedDate);

            if(allBookingsError) throw allBookingsError;

            calculateAvailableTimes({ selectedDate, bookedTimes: allBookings, serviceDuration })
        } catch (error) {
            alert(`getBookingsByDate -- ${error.message}`);
        }
    }

    return {
        bookingCompany,
        selectedService,
        bookings,
        getBookingCompany,
        getBookingsByDate,
    }

})
