<template>
    <div class="flex p-5 gap-5">
        <div class="flex flex-col p-2 gap-5 items-center border rounded-xl w-1/3">
            <div class="font-semibold text-xl mb-5">Business Info</div>
            <div>{{mainStore.businessInfo.name}}</div>
            <div>{{mainStore.businessInfo.description}}</div>
            <nuxt-img v-if="mainStore.businessInfo.logo_url" width="250" height="150" :src="`${logoUrl}/${mainStore.businessInfo.logo_url}`"/>
        </div>
        <div class="border rounded-xl p-2 w-2/3">
            <div class="font-semibold text-xl mb-5">Employees</div>
            <LazyAdminEmployeeCard
                class="border-b pb-5"
                v-for="employee in mainStore.businessEmployees"
                :employee="employee"
                :key="employee.user_id"
            />
        </div>
    </div>
</template>
<script setup>
    import {useMainStore} from "~/stores/main";
    const {public: {logoUrl}} = useRuntimeConfig();
    const mainStore = useMainStore();

</script>
