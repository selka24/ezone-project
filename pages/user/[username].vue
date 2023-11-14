<template>
    <div class="flex flex-col items-center justify-center h-[100vh]">
        <div v-if="bookingCompany?.id" class="w-full max-w-lg bg-base-100 h-[95vh] max-h-[800px] flex flex-col">
            <CompanyLogo/>
            <div class="w-full relative flex-1 overflow-hidden overflow-y-auto no-scrollbar">
                <transition-group name="scroll">
                    <div v-if="bookStep === 1" class="absolute h-[100%] w-full">
                        <div class="flex mb-5 border-b border-secondary-content/20 pb-4">
                            {{steps[1]}}
                        </div>
                        <service-select />
                    </div>
                    <div v-else-if="bookStep === 2" class="absolute h-[100%] w-full">
                        <div class="flex my-5 border-b border-secondary-content/20 pb-4">
                            {{steps[2]}}
                        </div>
                        <booking-calendar />
                    </div>
                    <div v-else-if="bookStep === 3" class="absolute h-[100%] w-full">
                        <div class="flex my-5 border-b border-secondary-content/20 pb-4">
                            {{steps[3]}}
                        </div>
                        <div class="flex flex-col gap-5 overflow-scroll no-scrollbar h-[400px]">
                            <div :class="['form-control px-3 border border-gray-200 rounded-[20px] h-[80px] flex', {'bg-primary border-primary text-white': bookingStore.selectedTime === time}]"
                                 v-for="time in bookingStore.availableTimes"
                                 :key="time.clock">
                                <label :for="time.clock" class="flex label cursor-pointer">
                                    <span class="font-semibold text-center">{{ time.clock.split('-')[0] }}</span>
                                    <span class="flex text-sm text-center gap-5">
                                    <span v-for="e in time.availableEmpl" class="">
                                        {{mainStore.businessEmployees.find(bE => bE.user_id === e).name}}
                                    </span>
                                </span>
                                    <!--                                            <span class="text-sm text-center">{{ time.split('-')[1] }}</span>-->
                                    <input :id="time.clock"
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
                    <div v-else-if="bookStep === 4" class="absolute px-5 h-[100%] w-full" id="stepper-4">
                        <div class="flex my-5 border-b border-secondary-content/20 pb-4">
                            {{steps[4]}}
                        </div>
                        <div class="flex flex-col gap-3 mb-4">
                            <div class="flex gap-2 items-center">
                                <span class="label-text">Sherbimi:</span> <div class="font-semibold" v-for="sr in bookingStore.selectedService" :key="sr.id + 'sr'">{{sr.name}}</div>
                            </div>
                            <div class="flex gap-2 items-center">
                                <span class="label-text">Data:</span> <div class="font-semibold" v-if="bookingStore.selectedDate">{{format(bookingStore.selectedDate, 'dd/LL/yyyy')}}, {{bookingStore.selectedTime.clock}}</div>
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
                </transition-group>
            </div>
            <div class="flex flex-shrink w-full bg-base-100 justify-center items-center">
                <button :disabled="stepInvalid" @click="changeStep" class="btn btn-primary">{{ bookStep === 4 ? 'Prenoto' : 'Vazhdo' }}</button>
<!--                <button @click="handleGetBookingsByDate" class="btn btn-primary">TEST</button>-->
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
    import CompanyLogo from "~/components/booking/CompanyLogo.vue";
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
        // nextTick(() => {
        //     useScrollTo('parent-steps', `stepper-${bookStep.value}`);
        // })
        if(nextStep === 3){
            handleGetBookingsByDate();
        }
    }

    if(username){
        mainStore.checkForCompany(username);
    }
</script>
