<script setup>
    import {useMainStore} from "~/stores/main";
    import {useBookingStore} from "~/stores/booking";

    const mainStore = useMainStore();
    const bookingStore = useBookingStore();

    const {businessServices} = toRefs(mainStore);

    const handleServiceSelect = (service) => {
        const idx = bookingStore.selectedService.findIndex(s => s.id === service.id);
        if(idx >= 0)
            bookingStore.selectedService.splice(idx, 1);
        else
            bookingStore.selectedService.push(service);
    }
</script>

<template>
    <div class="flex flex-wrap text-left gap-5 max-h-40 overflow-y-scroll no-scrollbar overflow-hidden">
        <div v-for="s in businessServices" :key="s.id" class="border rounded-xl p-1 px-2 border-gray-200 form-control">
            <label class="label cursor-pointer">
                <span class="flex flex-col mr-5">
                    <span class="label-text">
                        {{s.name}}
                    </span>
                </span>

                <input
                    @input="handleServiceSelect(s)"
                    :checked="bookingStore.selectedService.findIndex(x => x.id === s.id) >= 0"
                    type="checkbox"
                    class="checkbox checkbox-primary"
                />
            </label>
        </div>
    </div>
</template>

<style scoped>

</style>
