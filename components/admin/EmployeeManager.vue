<script setup>
    import {useMainStore} from "~/stores/main";

    const props = defineProps({
        employee: {
            type: Object,
            default: () => {
                return {
                    "user_id": "815692a4-6508-4554-b79d-cc85168a5cd9",
                    "id": "815692a4-6508-4554-b79d-cc85168a5cd9",
                    "name": "Krisel",
                    "company_id": null,
                    "services": [],
                    "busy": null,
                }
            }
        }
    });

    const mainStore = useMainStore();

    const getEmployeeServices = () => {
        return mainStore.businessEmployees.find(empl => empl.user_id === props.employee.user_id);
    }

    const serviceAdded = (serviceId) => getEmployeeServices().services.findIndex(id => id === serviceId) >= 0;
    const handleServiceChange = (serviceId) => {
        let empl = getEmployeeServices();
        const idx = empl.services.findIndex(id => id === serviceId);
        if(idx < 0)
            empl.services = [...empl.services, serviceId];
        else
            empl.services = empl.services.filter(s => s !== serviceId)
        //services.splice(idx, 1);
        console.log(empl.services, idx, 'handleServiceChange')
    }

    const handleEmployeeDelete = async () => {
        if(props.employee.created_at) {
            await mainStore.deleteEmployee(props.employee.user_id);
        }
        mainStore.businessEmployees = mainStore.businessEmployees.filter(em => em.user_id !== props.employee.user_id);
    }
</script>

<template>
    <div class="border p-3 rounded-xl select-none">
        <accordion>
            <template #header>
                <div class="flex px-4 sm:px-0 cursor-pointer">
                    <div>
                        <h3 class="text-base font-semibold leading-7 text-gray-900">{{employee.name}}</h3>
                        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{{employee.company_id}}</p>
                    </div>
                </div>
            </template>
            <template #right-actions>
                <button-custom @click="handleEmployeeDelete" class="mt-auto" theme="danger">Delete</button-custom>
            </template>
            <div class="mt-6 border-t border-gray-100 pt-5">
                <fieldset>
                    <legend class="text-sm font-semibold leading-6 text-gray-900">Add services</legend>
                    <div class="mt-6 flex flex-wrap gap-x-5">
                        <div v-for="service in mainStore.businessServices" :key="`${service.id}-${employee.user_id}`" class="relative flex gap-x-3 ml-1 items-center">
                            <div class="flex h-6 items-center">
                                <input
                                    :id="`${service.id}-${employee.user_id}`"
                                    type="checkbox"
                                    :value="service.id"
                                    :checked="serviceAdded(service.id)"
                                    @input="handleServiceChange(service.id)"
                                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                >
                            </div>
                            <div class="text-sm leading-6">
                                <label for="comments" class="font-medium text-gray-900">{{ service.name }}</label>
                                <p class="text-gray-500">{{service.duration}}</p>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
        </accordion>
    </div>
</template>
