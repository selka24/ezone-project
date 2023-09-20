<template>
    <div class="flex p-5 gap-5">
        <div class="flex flex-col p-2 gap-5 border rounded-xl w-full">
            <div class="font-semibold text-xl mb-5">Te dhenat</div>
            <div class="flex items-center">
                <div>
                    <div>Emri: <b>{{mainStore.businessInfo.name}}</b></div>
                    <div>Pershkrimi: <b>{{mainStore.businessInfo.description}}</b></div>
                </div>
                <img class="ml-auto w-auto h-[100px]"  v-if="mainStore.businessInfo.logo_url" :src="`${logoUrl}/${mainStore.businessInfo.logo_url}`"/>
            </div>
            <div>
                <CompanyFormStepHeader title="Sherbimet" description="Ketu mund te shikosh dhe menaxhosh sherbimet."/>
            </div>
            <div>
                <AdminServiceList/>
            </div>
        </div>
        <div class="border rounded-xl p-2 w-full">
            <div class="font-semibold text-xl mb-5">Punonjesit</div>
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
    const mainStore = useMainStore();
    const {public: {logoUrl}} = useRuntimeConfig();
    definePageMeta({
        middleware: ['auth', 'company']
    })




</script>
