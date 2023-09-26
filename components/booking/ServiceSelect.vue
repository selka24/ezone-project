<script setup lang="ts">
    import {useMainStore} from "~/stores/main";
    import {useBookingStore} from "~/stores/booking";

    const mainStore = useMainStore();
    const bookingStore = useBookingStore();

    const {businessServices} = toRefs(mainStore);

    const handleServiceSelect = (service) => {
        if(service.id === bookingStore.selectedService?.id)
            bookingStore.selectedService = null;
        else
            bookingStore.selectedService = service;
    }
</script>

<template>
    <div class="flex flex-wrap text-left gap-5 h-44 overflow-y-scroll no-scrollbar overflow-hidden">
        <div v-for="s in businessServices" :key="s.id" class="border rounded-xl p-1 px-2 border-gray-200 form-control">
            <label class="label cursor-pointer">
                <span class="flex flex-col mr-5">
                    <span class="label-text">
                        {{s.name}}
                    </span>
                    <span>
                        {{s.duration}}
                    </span>
                </span>

                <input
                    @input="handleServiceSelect(s)"
                    :checked="bookingStore.selectedService?.id === s.id"
                    type="checkbox"
                    class="checkbox checkbox-primary"
                />
            </label>
        </div>
    </div>
</template>

<style scoped>

</style>
