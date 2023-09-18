<script setup lang="ts">
    import {useMainStore} from "~/stores/main";

    const mainStore = useMainStore();

    const handleServiceDelete = (idx) => {
        mainStore.businessServices.splice(idx, 1);
    }

    const displayDuration = (duration) => {
        const parts = duration.split(':');
        const hour = (parts[0] === '00' ? '' : (parts[0]) + 'h')
        return `${hour} ${parts[1]}min`
    }
</script>

<template>
    <ul role="list" class="divide-y divide-gray-200 max-h-96 h-full overflow-hidden overflow-y-auto services pr-5">
        <li v-for="(service, idx) in mainStore.businessServices" :key="idx" class="flex justify-between gap-x-6 py-5">
            <div class="flex min-w-0 gap-x-4">
                <div class="min-w-0 flex-auto">
                    <p class="text-sm font-semibold leading-6 text-gray-900">{{ service.name  }}</p>
                    <p class="mt-1 truncate text-xs leading-5 text-gray-500">Kohezgjatja: {{ displayDuration(service.duration) }}</p>
                </div>
            </div>
            <div class="flex gap-5 items-end">
                <div class="flex flex-col">
                    <p class="text-sm leading-6 text-gray-900">Cmimi</p>
                    <p class="mt-1 text-xs leading-5 text-gray-500">ALL {{ service.price }}</p>
                </div>
                <button @click="handleServiceDelete(idx)" class="mt-auto rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Delete</button>
            </div>
        </li>
    </ul>
</template>

<style>
.services::-webkit-scrollbar {
    width: 14px;
}

.services::-webkit-scrollbar-track {
    background-color: #e4e4e4;
    border-radius: 100px;
}
.services::-webkit-scrollbar-thumb {
    border: 5px solid transparent;
    border-radius: 100px;
    background-color: #8070d4;
    background-clip: content-box;
}
</style>
