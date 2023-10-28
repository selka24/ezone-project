<template>
    <div class="px-5 flex justify-center mt-10 ">
        <div v-if="bookingCompany?.id" class="card items-center w-full max-w-lg bg-base-100 shadow-2xl h-[80vh]">
            <div class="card-body w-full overflow-hidden">
                <div class="flex flex-col justify-between items-center gap-x-5 gap-y-2 mb-5">
                    <h3 class="card-title">
                        {{bookingCompany.name}}
                    </h3>
                    <nuxt-img
                        format="webp"
                        class="w-auto h-[100px] rounded-full"
                        :src="`${logoUrl}/${bookingCompany.logo_url}`"
                        alt="business-logo"/>
                    <p>{{ bookingCompany.description }}</p>
                </div>
                <div class="w-full text-left h-full flex flex-col">
<!--                    <div class="flex flex-grow-0 flex-shrink mb-5 border-b border-secondary-content/20 pb-4">-->
<!--                        <div class="relative flex w-full">-->
<!--                            <Icon name="ion:arrow-back-outline" class="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2" @click="changeStep(0)"/>-->
<!--                            <transition mode="out-in">-->
<!--                                <div :key="bookStep" class="font-medium">-->
<!--                                    {{steps[bookStep]}}-->
<!--                                </div>-->
<!--                            </transition>-->
<!--                        </div>-->
<!--                    </div>-->
                    <div class="flex flex-auto relative border-secondary-content/20 pb-5 mb-5 overflow-hidden overflow-y-scroll no-scrollbar h-full max-h-[500px]" id="parent-steps">
                        <div class="w-full">
<!--                            <Transition name="slide-fade" mode="out-in">-->
                            <div class="h-[500px]" id="stepper-1">
                                <div class="flex mb-5 border-b border-secondary-content/20 pb-4">
                                    {{steps[1]}}
                                </div>
                                <service-select />
                            </div>
                                <!--                            - {{format(bookingStore.selectedDate, 'EEEE d LLLL')}}-->
                            <div class="h-[500px]" id="stepper-2">
                                <div class="flex my-5 border-b border-secondary-content/20 pb-4">
                                    {{steps[2]}}
                                </div>
                                <booking-calendar />
                            </div>
                            <div class="h-[500px]" id="stepper-3">
                                <div class="flex my-5 border-b border-secondary-content/20 pb-4">
                                    {{steps[3]}}
                                </div>
                                <div class="flex flex-col gap-2">
                                    <div class="form-control max-w-max" v-for="time in bookingStore.availableTimes" :key="time">
                                        <label class="label cursor-pointer">
                                            <span class="label-text mr-2">{{ time }}</span>
                                            <input type="radio" name="times" :value="time" v-model="bookingStore.selectedTime" class="radio radio-primary" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex w-full bg-base-100 py-5 absolute bottom-0 left-1/2 -translate-x-1/2 justify-center items-center">
                        <button @click="changeStep" class="btn btn-primary">Vazhdo</button>
                    </div>
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
    import {useUtils} from "~/composables/utils";
    const {public: {logoUrl}} = useRuntimeConfig();
    const bookStep = ref(1);
    const route = useRoute();
    const {username} = route.params;
    const bookingStore = useBookingStore();
    const mainStore = useMainStore();
    const {useScrollTo} = useUtils()


    const bookingCompany = computed(() => {
        return mainStore.businessInfo
    })

    const steps = {
        1: 'Zgjidh Sherbimin',
        2: 'Zgjidh Daten',
        3: 'Zgjidh Orarin'
    }

    const changeStep = (back) => {
        if(back === 0){
            bookStep.value > 1 && bookStep.value--;
        } else {
            if(bookStep.value > 2)
                bookStep.value--
            else
                bookStep.value++;
            useScrollTo('parent-steps', `stepper-${bookStep.value}`);
        }
    }

    if(username){
        mainStore.checkForCompany(username);
    }
</script>
