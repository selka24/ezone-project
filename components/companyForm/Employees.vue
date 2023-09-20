<template>
<!--     <form @submit.prevent="handleSubmit">-->
        <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
                <CompanyFormStepHeader title="Business employees" description="Below you can search users and add them as employees."/>
                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-4">
                        <SearchSelect
                            :options="mainStore.users"
                            display-key="full_name"
                            @optionSelect="handleUserSelect"
                            @searchChange="handleSearchChange"
                        />
                    </div>
                </div>
            </div>
            <div class="flex flex-col divide-gray-100 gap-5">
                <LazyAdminEmployeeManager
                    class="border-b pb-5"
                    v-for="employee in mainStore.businessEmployees"
                    :employee="employee"
                    :key="employee.user_id"
                />
            </div>
            <div>
                <button @click="handleSubmit"
                        type="button"
                        class="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Save
                </button>
            </div>
        </div>
<!--     </form>-->
    <Loading v-if="loading"/>
</template>
<script setup>
    import { useMainStore } from '~/stores/main';

    const mainStore = useMainStore();
    const loading = ref(false);

    console.log(mainStore.businessInfo, 'mainStore.businessInfo')

    onMounted(() => {
        if(mainStore.businessInfo?.id) {
            mainStore.checkForEmployees();
        }
    })

    const defaultEmployee = {
        "user_id": null,
        "name": null,
        "company_id": null,
        "services": [],
        "busy": null,
    }

    const handleSearchChange = (text) => {
        mainStore.searchUsers(text);
    }

    const transformToEmployee = ({full_name, id}) => {
        return {
            ...defaultEmployee,
            name: full_name,
            user_id: id
        }
    }

    const handleUserSelect = (user) => {
        const idx = mainStore.businessEmployees.findIndex(x => x.user_id === user.id);
        if(idx < 0) {
            if(!mainStore.businessInfo.id) {
                alert('No business id found');
                return;
            }
            const employee = transformToEmployee(user);
            employee.company_id = mainStore.businessInfo.id;
            mainStore.businessEmployees = [employee, ...mainStore.businessEmployees];
        }
    }

    const handleSubmit = async () => {
        loading.value = true;
        await mainStore.addEmployees();
        loading.value = false;
    }
</script>
