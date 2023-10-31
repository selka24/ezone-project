<template>
    <div class="px-5 flex flex-col items-center justify-center mt-10 ">
<!--        <nuxt-img-->
<!--            format="webp"-->
<!--            width="300"-->
<!--            height="100"-->
<!--            src="/images/logo.png"-->
<!--            alt="e zone logo"-->
<!--        />-->
        <div v-if="bookingCompany?.id" class="card items-center w-full max-w-lg bg-base-100 shadow-2xl">
            <div class="card-body w-full overflow-hidden">
                <div class="flex flex-col justify-between items-center gap-x-5 gap-y-2 mb-5">
<!--                    <h3 class="card-title">-->
<!--                        {{bookingCompany.name}}-->
<!--                    </h3>-->
                    <nuxt-img
                        format="webp"
                        width="150"
                        height="150"
                        class="w-auto h-[150px] rounded-full"
                        :src="`${logoUrl}/${bookingCompany.logo_url}`"
                        alt="business-logo"/>
<!--                    <p>{{ bookingCompany.description }}</p>-->
                </div>
                <div class="w-full text-left flex flex-col">
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
                    <div class="flex flex-auto relative border-secondary-content/20 mb-5 overflow-hidden overflow-y-scroll no-scrollbar h-[500px]" id="parent-steps">
                        <div class="w-full">
<!--                            <Transition name="slide-fade" mode="out-in">-->
                            <div class="h-[500px]" id="stepper-1">
                                <div class="flex mb-5 border-b border-secondary-content/20 pb-4">
                                    {{steps[1]}}
                                </div>
                                <service-select />
                            </div>
                                <!--                            - {{format(bookingStore.selectedDate, 'EEEE d LLLL')}}-->
                            <div v-show="!!availableSteps.find(x => x === 2)" class="h-[500px]" id="stepper-2">
                                <div class="flex my-5 border-b border-secondary-content/20 pb-4">
                                    {{steps[2]}}
                                </div>
                                <booking-calendar />
                            </div>
                            <div class="h-[500px]" id="stepper-3" v-show="!!availableSteps.find(x => x === 3)">
                                <div class="flex my-5 border-b border-secondary-content/20 pb-4">
                                    {{steps[3]}}
                                </div>
                                <div class="flex flex-wrap justify-between gap-5 overflow-scroll no-scrollbar h-[420px]">
                                    <div :class="['form-control px-3 border border-gray-200 rounded-[20px] h-[80px] flex justify-center max-w-[80px]', {'bg-primary border-primary text-white': bookingStore.selectedTime === time}]"
                                         v-for="time in bookingStore.availableTimes"
                                         :key="time">
                                        <label :for="time" class="flex flex-col label cursor-pointer">
                                            <span class="font-semibold text-center">{{ time.split('-')[0] }}</span>
<!--                                            <span class="text-sm text-center">-</span>-->
<!--                                            <span class="text-sm text-center">{{ time.split('-')[1] }}</span>-->
                                            <input :id="time"
                                                   type="radio"
                                                   name="times"
                                                   :value="time"
                                                   v-model="bookingStore.selectedTime"
                                                   class="hidden radio radio-primary"
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="h-[500px]" id="stepper-4" v-show="!!availableSteps.find(x => x === 4)">
                                <div class="flex my-5 border-b border-secondary-content/20 pb-4">
                                    {{steps[4]}}
                                </div>
                                <div class="flex flex-col gap-3 mb-4">
                                    <div class="flex gap-2 items-center">
                                        <span class="label-text">Sherbimi:</span> <div class="font-semibold" v-for="sr in bookingStore.selectedService" :key="sr.id + 'sr'">{{sr.name}}</div>
                                    </div>
                                    <div class="flex gap-2 items-center">
                                        <span class="label-text">Data:</span> <div class="font-semibold" v-if="bookingStore.selectedDate">{{format(bookingStore.selectedDate, 'dd/LL/yyyy')}} - {{bookingStore.selectedTime}}</div>
                                    </div>
                                </div>
                                <div class="flex gap-2 mb-2">
                                    <div class="form-control w-full max-w-xs">
                                        <label for="emri" class="label">
                                            <span class="label-text">Emri*</span>
                                        </label>
                                        <input v-model="bookingStore.bookName" id="emri" type="text" placeholder="Emri juaj" class="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div class="form-control w-full max-w-xs">
                                        <label for="numri" class="label">
                                            <span class="label-text">Nr. celular*</span>
                                        </label>
                                        <input v-model="bookingStore.bookNumber" id="numri" type="text" placeholder="Numri i telefonit" class="input input-bordered w-full max-w-xs" />
                                    </div>
                                </div>
                                <div class="form-control">
                                    <label for="shenime" class="label">
                                        <span class="label-text">Shenime</span>
                                    </label>
                                    <textarea id="shenime" class="textarea textarea-bordered h-24" placeholder="Vendos shenime"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex w-full bg-base-100 justify-center items-center">
                        <button :disabled="stepInvalid" @click="changeStep" class="btn btn-primary">{{ bookStep === 4 ? 'Prenoto' : 'Vazhdo' }}</button>
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
    const {useScrollTo} = useUtils();
    const availableSteps = ref([1]);


    const bookingCompany = computed(() => {
        return mainStore.businessInfo
    })

    const stepInvalid = computed(() => {
        if(bookStep.value === 1){
            return !bookingStore.selectedService.length;
        } else if (bookStep.value === 2){
            return !bookingStore.selectedDate
        } else if(bookStep.value === 3){
            return !bookingStore.selectedTime
        } else {
            return bookingStore.bookName.length < 3 || bookingStore.bookNumber.length < 10;
        }
    })

    const steps = {
        1: 'Zgjidh Sherbimin',
        2: 'Zgjidh Daten',
        3: 'Zgjidh Orarin',
        4: 'Vendos te dhenat',
    }

    const handleGetBookingsByDate = async () => {
        // selectedDate.value.setUTCHours(0,0,0,0)
        const payload = {
            selectedDate: bookingStore.selectedDate.toDateString(),
            serviceId: bookingStore.selectedService[0]?.id,
            companyId: mainStore.businessInfo?.id,
            serviceDuration: bookingStore.selectedService[0]?.duration
        }
        console.log(payload)
        await bookingStore.getBookingsByDate(payload);
    }

    const changeStep = (back) => {
        if(bookStep.value === 4) return;
        const step = availableSteps.value.find(x => back === x);
        let nextStep = bookStep.value + 1;
        if(!step){
            availableSteps.value = [...availableSteps.value, nextStep];
        }
        bookStep.value = nextStep;
        nextTick(() => {
            useScrollTo('parent-steps', `stepper-${bookStep.value}`);
        })
        if(nextStep === 3){
            handleGetBookingsByDate();
        }
    }

    if(username){
        mainStore.checkForCompany(username);
    }
</script>
