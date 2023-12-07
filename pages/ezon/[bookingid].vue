<template>
    <div>
        {{ params }}
    </div>
</template>
<script setup>
const {params} = useRoute();
const bookingStore = useBookingStore();

const getBooking = async () => {
    await bookingStore.getMyBooking(params.bookingid)
}

onMounted(() => {
    getBooking();
})

</script>
