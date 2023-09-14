<template>
    <form @submit.prevent="handleSubmit">
        <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
                <CompanyFormStepHeader title="Business Servicess" description="Below you will add the services your business offers."/>
                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-2">
                        <label for="service-name" class="block text-sm font-medium leading-6 text-gray-900">Service name</label>
                        <div class="mt-2">
                            <input 
                                v-model="newService.name"
                                type="text" 
                                name="service-name" 
                                id="service-name"
                                placeholder="Prerje flokesh"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                            <!-- <span
                                v-if="v$.name.$error"
                                class="mt-2 text-sm text-red-500"
                            >
                                {{ v$.name.$errors[0].$message }}
                            </span> -->
                        </div>
                    </div>

                    <div class="sm:col-span-1">
                        <label for="service-duration" class="block text-sm font-medium leading-6 text-gray-900">Duration</label>
                        <div class="mt-2">
                            <!-- <input 
                                v-model="newService.duration"
                                type="time"
                                placeholder="00 : 30" 
                                name="service-duration" 
                                id="service-duration"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            > -->
                            <TimePicker v-model="newService.duration"/>

                            <!-- <span
                                v-if="v$.name.$error"
                                class="mt-2 text-sm text-red-500"
                            >
                                {{ v$.name.$errors[0].$message }}
                            </span> -->
                        </div>
                    </div>
                    
                    <div class="sm:col-span-1">
                        <label for="service-price" class="block text-sm font-medium leading-6 text-gray-900">Price</label>
                        <div class="mt-2">
                            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">ALL</span>
                                <input
                                    v-model="newService.price"
                                    type="text" 
                                    name="service-price" 
                                    id="service-price" 
                                    class="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" 
                                    placeholder="500"
                                >
                            </div>
                          
                            <!-- <span
                                v-if="v$.name.$error"
                                class="mt-2 text-sm text-red-500"
                            >
                                {{ v$.name.$errors[0].$message }}
                            </span> -->
                        </div>
                    </div>
                    <div class="sm:col-span-1 self-end">
                        <button type="button" @click="handleServiceAdd" class="mt-auto rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add</button>
                    </div>
                </div>
            </div>
            <ul role="list" class="divide-y divide-gray-200 max-h-96 h-full overflow-hidden overflow-y-auto services pr-5">
                <li v-for="(service, idx) in mainStore.services" :key="idx" class="flex justify-between gap-x-6 py-5">
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
            <button :disabled="!mainStore.services.length" type="submit" class="mt-auto rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400">Insert Services</button>
        </div>
    </form>
</template>
<script setup>
/*
    Requirements
    1.Add name
    2.Add duration
    3.Add price
    4.Add description
*/
    import { useMainStore } from '~/stores/main';
    import {useVuelidate} from '@vuelidate/core';
    import {required, helpers} from '@vuelidate/validators';
    const mainStore = useMainStore();

    const defaultService = {
        name: '',
        description: '',
        duration: '00:00:00',
        price: '500'
    }

    const newService = reactive({...defaultService})

    const rules = computed(() => {
        return {
            name: {required},
            duration: {required},
            price: {required}
        }
    })

    const displayDuration = (duration) => {
        const parts = duration.split(':');
        const hour = (parts[0] === '00' ? '' : (parts[0]) + 'h')
        return `${hour} ${parts[1]}min`
    }

    const resetService = () => {
        for(const key in defaultService){
            console.log(key, 'keyyyy');
            newService[key] = defaultService[key];
        }
    }

    const handleServiceAdd = () => {
        mainStore.services.push({...newService});
        resetService();
    }

    const handleServiceDelete = (idx) => {
        mainStore.services.splice(idx, 1);
    }

    const handleSubmit = () => {
        console.log(mainStore.services, 'mainStore.services')
        mainStore.addServices();
    }
</script>
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