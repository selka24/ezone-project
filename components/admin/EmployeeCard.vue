<script setup>
    import {useMainStore} from "~/stores/main";

    const mainStore = useMainStore();
    const props = defineProps(['employee'])

    const formatDate = useDateFormat(props.employee.created_at);

    const services = computed(() => {
        return mainStore.businessServices.filter(s => {
            if(props.employee.services.find(x => s.id === x)) return s;
        })
    })
</script>

<template>
    <div class="border p-3 rounded-xl">
        <div class="flex gap-3 px-4 sm:px-0 cursor-pointer">
            <h3 class="text-base font-semibold leading-7 text-gray-900">{{employee.name}}</h3>
            <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{{formatDate}}</p>
            <button-custom class="ml-auto">Edit</button-custom>
        </div>
        <div class="flex gap-2">
            Sherbimet:
            <div v-for="(s, idx) in services" :key="s.id">
                {{`${s.name}${idx < (services.length - 1) ? ', ' : ''}`}}
            </div>
        </div>
    </div>
</template>
