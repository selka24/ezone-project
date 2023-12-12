<template>
    <div class="flex flex-col gap-5">
        <div :class="['form-control px-3 border border-gray-200 rounded-[20px] flex', { 'border-primary': bookingStore.selectedTime === time }]"
            v-for="time in bookingStore.availableTimes" :key="time.clock">
            <label :for="time.clock" class="flex label cursor-pointer">
                <span class="font-semibold text-center">{{ time.clock.split('-')[0] }}</span>
                <span class="flex text-sm text-center gap-5">
                    <span v-for="e in time.availableEmpl" :class="['border rounded-full w-7 h-7 flex justify-center items-center', {'bg-blue-500 text-white font-bold': bookingStore.selectedEmployee === e && bookingStore.selectedTime === time}]" @click="selectEmployee(e)">
                        {{ emplName(e).shortName }}
                    </span>
                </span>
                <input :id="time.clock" type="radio" name="times" :value="time" v-model="bookingStore.selectedTime"
                    class="hidden radio radio-primary" />
            </label>
        </div>
    </div>
</template>
<script setup>
const bookingStore = useBookingStore();
const mainStore = useMainStore();

const emplName = (emplId) => {
    const bEmpl = mainStore.businessEmployees.find(bE => bE.user_id === emplId)
    const shortName = bEmpl.name.split('')[0]
    return { shortName, name: bEmpl.name }
}

const selectEmployee = (e) => {
    bookingStore.selectedEmployee = e
}
</script>
