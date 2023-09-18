<template>
        <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
                <CompanyFormStepHeader title="Business Services" description="Below you will add the services your business offers."/>
                <div class="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-6">
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

                    <div class="sm:col-span-2 flex gap-5">
                        <div>
                            <label for="service-duration" class="block text-sm font-medium leading-6 text-gray-900">Duration</label>
                            <div class="mt-2">
                                <TimePicker v-model="newService.duration"/>
                                <!-- <span
                                    v-if="v$.name.$error"
                                    class="mt-2 text-sm text-red-500"
                                >
                                    {{ v$.name.$errors[0].$message }}
                                </span> -->
                            </div>
                        </div>
                        <div>
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
                    </div>

                    <div class="sm:col-span-1 self-end">
                        <button-custom :disabled="disableAdd" @click="handleServiceAdd">Add</button-custom>
                    </div>
                </div>
            </div>
            <ServiceList/>
            <div class="flex pr-5">
                <button-custom @click="handleSubmit" :disabled="!mainStore.businessServices.length" class="ml-auto">Continue</button-custom>
            </div>
        </div>
</template>
<script setup>
    import ServiceList from "~/components/admin/ServiceList.vue";
    import { useMainStore } from '~/stores/main';
    import {useVuelidate} from '@vuelidate/core';
    import {required} from '@vuelidate/validators';
    const mainStore = useMainStore();

    const defaultService = {
        name: '',
        description: '',
        duration: '00:00:00',
        price: ''
    }

    const newService = reactive({...defaultService})

    const rules = computed(() => {
        return {
            name: {required},
            duration: {required},
            price: {required}
        }
    })

    const disableAdd = computed(() => {
        return (!newService.name || !newService.price || newService.duration === '00:00:00');
    })


    const resetService = () => {
        for(const key in defaultService){
            console.log(key, 'keyyyy');
            newService[key] = defaultService[key];
        }
    }

    const handleServiceAdd = async () => {
        // mainStore.businessServices.push({...newService});
        await mainStore.addServices({...newService, company_id: mainStore.businessInfo.id});
        resetService();
    }


   const handleSubmit = () => {
        mainStore.formStep++;
    }
</script>
