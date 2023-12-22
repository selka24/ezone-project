<template>
    <div ref="bookParent" class="bg-neutral text-secondary bg-gradient-to-r to-40% from-accent flex flex-col items-center justify-center h-[100vh]">
        <div v-if="bookingCompany?.id" class="w-full max-w-lg h-[95vh] max-h-[800px] flex flex-col">
            <CompanyLogo />
            <div class="w-full relative flex-1 overflow-hidden overflow-y-auto no-scrollbar">
                <transition-group name="scroll">
                    <div v-if="bookStep === 1" class="px-5 absolute h-[100%] w-full">
                        <div class="flex mb-5 border-b border-secondary-content/20 pb-4">
                            {{ steps[1] }}
                        </div>
                        <service-select />
                    </div>
                    <div v-else-if="bookStep === 2" class="absolute h-[100%] w-full">
                        <div class="flex mx-5 my-5 border-b border-secondary-content/20 pb-4">
                            {{ steps[2] }}
                        </div>
                        <booking-calendar />
                    </div>
                    <div v-else-if="bookStep === 3" class="px-5 absolute h-[100%] w-full">
                        <time-select />
                    </div>
                    <div v-else-if="bookStep === 4" class="absolute px-5 h-[100%] w-full" id="stepper-4">
                        <div class="flex my-5 border-b border-secondary-content/20 pb-4">
                            {{ steps[4] }}
                        </div>
                        <div class="flex gap-2 mb-2">
                            <div class="form-control w-full max-w-xs">
                                <label for="emri" class="label">
                                    <span class="label-text">Emri*</span>
                                </label>
                                <input v-model="bookingStore.bookName" id="emri" type="text" placeholder="Emri juaj"
                                    class="input input-bordered w-full max-w-xs" />
                            </div>
                            <div class="form-control w-full max-w-xs">
                                <label for="numri" class="label">
                                    <span class="label-text">Nr. celular*</span>
                                </label>
                                <input v-model="bookingStore.bookNumber" id="numri" type="text"
                                    placeholder="Numri i telefonit" class="input input-bordered w-full max-w-xs" />
                            </div>
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label for="email" class="label">
                                <span class="label-text">Email*</span>
                            </label>
                            <input v-model="bookingStore.bookEmail" id="email" type="email"
                                   placeholder="Email" class="input input-bordered w-full max-w-xs" />
                        </div>
                        <div class="form-control">
                            <label for="shenime" class="label">
                                <span class="label-text">Shenime</span>
                            </label>
                            <textarea id="shenime" class="textarea textarea-bordered h-24"
                                placeholder="Vendos shenime"></textarea>
                        </div>

                        <div class="flex flex-col gap-3 mt-8">
                            <div class="flex gap-2 items-center">
                                <span class="font-semibold label-text">Sherbimi:</span>
                                <div class="" v-for="sr in bookingStore.selectedService" :key="sr.id + 'sr'">
                                    {{ sr.name }}</div>
                            </div>
                            <div class="flex gap-2 items-center">
                                <span class="label-text font-semibold">Data:</span>
                                <div class="" v-if="bookingStore.selectedDate">
                                    {{ format(bookingStore.selectedDate, 'dd/LL/yyyy') }}, {{
                                        bookingStore.selectedTime.clock }}
                                </div>
                            </div>

                            <div class="flex gap-2 items-center">
                                <span class="font-semibold label-text">Stafi:</span>
                                <div class="">
                                    {{ bookingStore.selectedEmployee }}
                                </div>
                            </div>
                        </div>
                    </div>
                </transition-group>
            </div>
            <div class="flex flex-shrink w-full bg-transparent justify-center items-center px-5">
                <button :disabled="stepInvalid" @click="changeStep(bookStep + 1)" class="border border-secondary/20 text-secondary/80 font-semibold uppercase rounded-2xl w-full py-5">{{ bookStep === 4
                    ? 'Prenoto' : 'Vazhdo' }}</button>
                <!--                <button @click="handleGetBookingsByDate" class="btn btn-primary">TEST</button>-->
            </div>
        </div>
        <company-card-skeleton v-else />
    </div>
</template>
<script setup>
import { useBookingStore } from "~/stores/booking";
import { useMainStore } from "~/stores/main";
import { format } from "date-fns";
import CompanyCardSkeleton from "~/components/loading/CompanyCardSkeleton.vue";
import CompanyLogo from "~/components/booking/CompanyLogo.vue";

const ServiceSelect = defineAsyncComponent(() => import('/components/booking/ServiceSelect.vue'))
const TimeSelect = defineAsyncComponent(() => import('/components/booking/TimeSelect.vue'))

const route = useRoute();
const { username } = route.params;
const bookingStore = useBookingStore();
const mainStore = useMainStore();

const bookStep = ref(1);
const bookParent = ref(null);
// const { isSwiping, direction } = useSwipe(bookParent)

const bookingCompany = computed(() => {
    return mainStore.businessInfo
})

const stepInvalid = computed(() => {
    if (bookStep.value === 1) {
        return !bookingStore.selectedService.length;
    } else if (bookStep.value === 2) {
        return !bookingStore.selectedDate
    } else if (bookStep.value === 3) {
        return !bookingStore.selectedTime || !bookingStore.selectedEmployee
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

const changeStep = async (step) => {
    if (step === 5) {
        const { start_time, end_time } = bookingStore.selectedTime.times;
        await bookingStore.createBooking({
            company_id: mainStore.businessInfo?.id,
            employee_id: bookingStore.selectedEmployee,
            service_id: bookingStore.selectedService[0]?.id,
            client_name: bookingStore.bookName,
            phone_number: bookingStore.bookNumber,
            start_time: start_time.toLocaleString(),
            end_time: end_time.toLocaleString(),
            status: 'upcoming',
            email: bookingStore.bookEmail
        })
        return;
    }
    if (step > 4 || step < 1) return;
    if (step)
        bookStep.value = step;
    if (step === 3 && !bookingStore.currentBookings.length) {
        await handleGetBookingsByDate();
    }
}

if (username) {
    mainStore.checkForCompany(username);
}

// const handleScroll = (wheel) => {
//     console.log(wheel.deltaY, 'eeeeeeeeeeee')
//     if (wheel.deltaY < 0) {
//         console.log("Scrolling up");
//         changeStep(bookStep.value - 1)
//     } else {
//         console.log("Scrolling down");
//         if (!stepInvalid.value) {
//             changeStep(bookStep.value + 1)
//         }
//     }
// }
// const handleTouch = () => {
//     console.log(direction.value, 'eeeeeeeeeeee')
//     if (direction.value === 'down') {
//         changeStep(bookStep.value - 1)
//     } else if (direction.value === 'up') {
//         changeStep(bookStep.value + 1)
//     }
// }
//
// watch(direction, () => {
//     handleTouch();
// })

watch(bookStep, (newval, oldval) => {
    if (newval > oldval) {

    } else {

    }
})

onBeforeMount(() => {
    if (process.client) {
        // window.addEventListener("wheel", handleScroll);
    }
})

onBeforeUnmount(() => {
    // window.removeEventListener("wheel", handleScroll);
})
</script>
