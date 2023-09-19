<script setup lang="ts">
    import {useMainStore} from "~/stores/main";

    const mainStore = useMainStore();
    const editId = ref(null);
    const editServiceModel = ref({})
    const handleServiceDelete = (idx) => {
        mainStore.businessServices.splice(idx, 1);
    }

    const handleEdit = (service) => {
        editServiceModel.value = {...service}
        editId.value = service.id;
    }

    const handleCancel = () => {
        editServiceModel.value = {};
        editId.value = null;
    }

    const handleSave = () => {
        console.log(editServiceModel.value, 'edit model');
        mainStore.updateService(editServiceModel.value);
    }

    const displayDuration = (duration) => {
        const parts = duration.split(':');
        const hour = (parts[0] === '00' ? '' : (parts[0]) + 'h')
        return `${hour} ${parts[1]}min`
    }
</script>

<template>
    <ul role="list" class="divide-y divide-gray-200 max-h-96 h-full overflow-hidden overflow-y-auto services pr-5">
        <li v-for="(service, idx) in mainStore.businessServices" :key="idx" class="flex py-5">
            <div class="flex gap-x-4">
                <div v-if="editId === service.id">
                    <input
                        v-model="editServiceModel.name"
                        type="text"
                        name="service-name"
                        id="service-name"
                        placeholder="Emri i sherbimit"
                        class="block w-[150px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                    <TimePicker class="w-max" v-model="editServiceModel.duration"/>
                </div>
                <div v-else class="min-w-0 flex-auto">
                    <p class="text-sm font-semibold leading-6 text-gray-900">{{ service.name  }}</p>
                    <p class="mt-1 truncate text-xs leading-5 text-gray-500">Kohezgjatja: {{ displayDuration(service.duration) }}</p>
                </div>
            </div>
            <div class="flex ml-auto gap-x-5">
                <div v-if="editId === service.id">
                    <div class="flex w-[100px] rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                        <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">ALL</span>
                        <input
                            v-model="editServiceModel.price"
                            type="text"
                            name="service-price"
                            id="service-price"
                            class="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Cmimi"
                        >
                    </div>
                </div>
                <div v-else class="flex items-center flex-col">
                    <p class="text-sm leading-6 text-gray-900">Cmimi</p>
                    <p class="mt-1 text-xs leading-5 text-gray-500">ALL {{ service.price }}</p>
                </div>
                <div class="flex flex-col gap-y-2" v-if="service.id !== editId">
                    <button-custom
                        :disabled="editId !== null && service.id !== editId"
                        @click="handleEdit(service)">
                        Edit
                    </button-custom>
                    <button-custom
                        :disabled="editId !== null && service.id !== editId"
                        @click="handleServiceDelete(idx)" theme="danger">
                        Delete
                    </button-custom>
                </div>
                <div v-else class="flex flex-col gap-y-2">
                    <button-custom @click="handleSave">Save</button-custom>
                    <button-custom @click="handleCancel" theme="danger">Cancel</button-custom>
                </div>
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
