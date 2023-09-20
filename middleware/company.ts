import {useMainStore} from "~/stores/main";

export default defineNuxtRouteMiddleware(async (to) => {
    const mainStore = useMainStore();
    if(!mainStore.businessInfo.id) {
        const response = await mainStore.checkForCompany();
        // const {data, error} = await client.from('companies').select().eq('company_owner', user.value.id);
        if(!mainStore.businessInfo?.id && to.path === '/admin')
            return navigateTo('/');
    }
    if(to.path === '/business') {
        if (mainStore.businessInfo?.id || !mainStore.isOwner)
            return navigateTo('/');
    }
})
