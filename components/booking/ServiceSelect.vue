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
    <div>
        <div class="flex flex-col text-left gap-5 overflow-x-scroll no-scrollbar overflow-hidden">
            <div v-for="s in businessServices" :key="s.id" :class="['border rounded-sm flex justify-center px-2 border-gray-200 form-control', {'bg-primary border-primary !text-white': bookingStore.selectedService.findIndex(x => x.id === s.id) >= 0}]">
                <label :for="s.id + 'S'" class="text-center label cursor-pointer">
                    <span class="flex justify-between w-full">
                        <span class="text-sm">
                            {{s.name}}
                        </span>
                        <span class="text-sm flex items-center gap-1">
                            <Icon name="iconoir:clock"/> {{s.duration}}
                        </span>
                    </span>
                    <input
                        :id="s.id + 'S'"
                        @input="handleServiceSelect(s)"
                        :checked="bookingStore.selectedService.findIndex(x => x.id === s.id) >= 0"
                        type="checkbox"
                        class="hidden checkbox checkbox-primary"
                    />
                </label>
            </div>
        </div>
<!--        <transition>-->
<!--            <div v-if="bookingStore.selectedService?.length" class="mt-10">-->
<!--                <div class="border-b pb-5">-->
<!--                    Sherbimet e zgjedhura-->
<!--                </div>-->
<!--                <div class="mt-5 flex flex-col gap-5">-->
<!--                    <transition-group name="slide-in">-->
<!--                        <div v-for="selSrvc in bookingStore.selectedService"-->
<!--                             :key="selSrvc.id + 'selS'"-->
<!--                             class="border flex flex-col border-gray-200 px-2 py-1 rounded-md">-->
<!--                            <div>-->
<!--                                {{selSrvc.name}}-->
<!--                            </div>-->
<!--                            <div>-->
<!--                                Kohëzgjatja: {{selSrvc.duration}}-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </transition-group>-->
<!--                </div>-->
<!--            </div>-->
<!--        </transition>-->
    </div>
</template>

<style scoped>
.slide-in-enter-from {
    opacity: 0;
    translate: 200px 0;
}
.slide-in-enter-to {
    opacity: 1;
    translate: 0 0;
}

.slide-in-enter-active,
.slide-in-move {
    transition: all 0.7s;
}
.slide-in-leave-active{
    transition: all 0.3s;
}
.slide-in-leave-active { position: absolute; }

.slide-in-leave-from { opacity: 1; }
.slide-in-leave-to { opacity: 0; }
</style>
