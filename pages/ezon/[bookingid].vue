<template>
    <div class="flex flex-col">
        <CompanyLogo v-if="bookingStore.bookingCompany?.logo_url" />
        <BookingPreview :booking="bookingStore.myBooking"/>
    </div>
</template>
<script setup>
import CompanyLogo from "~/components/booking/CompanyLogo.vue";

const { params } = useRoute();
const bookingStore = useBookingStore();

const getBooking = async () => {
    await bookingStore.getMyBooking(params.bookingid)
}

onMounted(() => {
    getBooking();
})

</script>
