<template>
    <div class="w-full">
        <client-only>
            <VDatePicker
                :expanded="true"
                mode="date"
                transparent
                view="weekly"
                :min-date="new Date()"
                :borderless="true"
                v-model="date"
            >
                <template #header-title="info">
                   {{date ? useFormatDate(date) : info.title}}
                </template>
            </VDatePicker>
        </client-only>
    </div>
</template>
<script setup>
    import {useFormatDate} from "~/helpers/utilites";
    import {useBookingStore} from "~/stores/booking";
    import {useMainStore} from "~/stores/main";
    const date = ref(new Date());

    const bookingStore = useBookingStore();
    const mainStore = useMainStore();


    const getBookingsByDate = async () => {
        const payload = {
            selectedDate: date.value,
            serviceId: bookingStore.selectedService?.id,
            companyId: mainStore.businessInfo?.id,
            serviceDuration: bookingStore.selectedService?.duration
        }
        console.log(payload)
        await bookingStore.getBookingsByDate(payload)
    }

    watch(date, (newValue) => {
        console.log(newValue, 'updateeee')
        if(newValue) {
            getBookingsByDate();
        }
    })
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

<style scoped>

</style>
