<template>
    <div class="px-5 flex justify-center mt-10">
        <div v-if="bookingCompany?.id" class="card items-center w-full max-w-lg bg-base-100 shadow-2xl h-[90vh]">
            <div class="card-body w-full h-full">
                <div class="flex flex-col justify-between items-center gap-x-5 gap-y-2 mb-5">
                    <h3 class="card-title">
                        {{bookingCompany.name}}
                    </h3>
                    <img
                        class="w-auto h-[100px] rounded-full"
                        :src="`${logoUrl}/${bookingCompany.logo_url}`"
                        alt="business-logo"/>
                    <p>{{ bookingCompany.description }}</p>
                </div>
<!--                <div class="text-sm breadcrumbs mb-2 overflow-y-hidden">-->
<!--                    <ul>-->
<!--                        <li @click.prevent="() => accordion = step" v-for="step in bookSteps" :key="step">-->
<!--                            <span>{{ step }}</span>-->
<!--                        </li>-->
<!--                    </ul>-->
<!--                </div>-->

<!--                <div v-if="accordion === 'Sherbimet'" class="h-full flex flex-col">-->
<!--                    <service-select/>-->
<!--                    <button class="btn btn-primary mt-auto">Shiko Datat</button>-->
<!--                </div>-->
<!--                <div v-else-if="accordion === 'Data'">-->
<!--                    <lazy-booking-calendar />-->
<!--                </div>-->
<!--                <div v-else-if="accordion === 'Orari'" class="flex flex-wrap gap-2">-->
<!--                    <div class="form-control" v-for="time in bookingStore.availableTimes" :key="time">-->
<!--                        <label class="label cursor-pointer">-->
<!--                            <input type="radio" name="times" :value="time" v-model="bookingStore.selectedTime" class="radio radio-primary" />-->
<!--                            <span class="label-text">{{ time }}</span>-->
<!--                        </label>-->
<!--                    </div>-->
<!--                </div>-->

                <div class="rounded-none w-full text-left h-full flex flex-col">
                    <Transition name="slide-fade" mode="out-in">
                        <div v-if="bookStep === 1">
                            <div class="font-medium mb-5">
                                Zgjidh Sherbimin
                            </div>
                            <service-select/>
                        </div>
                        <div v-else-if="bookStep === 2">
                            <div class="font-medium mb-5">
                                Zgjidh Daten
    <!--                            - {{format(bookingStore.selectedDate, 'EEEE d LLLL')}}-->
                            </div>
                            <booking-calendar />
                        </div>
                        <div v-else-if="bookStep === 3">
                            <div class="font-medium">
                                Zgjidh Orarin
                            </div>
                            <div class="flex flex-col gap-2 max-h-[370px] overflow-y-scroll no-scrollbar">
                                <div class="form-control max-w-max" v-for="time in bookingStore.availableTimes" :key="time">
                                    <label class="label cursor-pointer">
                                        <span class="label-text mr-2">{{ time }}</span>
                                        <input type="radio" name="times" :value="time" v-model="bookingStore.selectedTime" class="radio radio-primary" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </Transition>
                    <button @click="() => {bookStep < 3 ? bookStep++ : bookStep--}" class="btn btn-primary mt-auto self-center">Vazhdo</button>
                </div>
            </div>
        </div>
        <company-card-skeleton v-else />
    </div>
</template>
<script setup>
    import {useBookingStore} from "~/stores/booking";
    import {useMainStore} from "~/stores/main";
    import {format} from "date-fns";
    import ServiceSelect from "~/components/booking/ServiceSelect.vue";
    import CompanyCardSkeleton from "~/components/loading/CompanyCardSkeleton.vue";
    const {public: {logoUrl}} = useRuntimeConfig();
    const bookStep = ref(1);
    const route = useRoute();
    const {username} = route.params;
    const bookingStore = useBookingStore();
    const mainStore = useMainStore();
    const accordion = ref('Sherbimet');


    const bookingCompany = computed(() => {
        return mainStore.businessInfo
    })

    if(username){
        mainStore.checkForCompany(username);
    }
</script>
<style scoped>
.collapse-title{
    padding: 0.75rem 3rem 0.75rem 0;
    min-height: min-content !important;
}
.collapse-content{
    padding-left: 0;
    padding-right: 0;
}
</style>
