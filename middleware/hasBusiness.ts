import {useMainStore} from "~/stores/main";

export default defineNuxtRouteMiddleware((to, from) => {
    const mainStore = useMainStore();
    if(mainStore.businessInfo.id)
        return navigateTo('/');
})
