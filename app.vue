<template>
    <div>
        <NuxtLayout>
            <NuxtPage/>
        </NuxtLayout>
    </div>
</template>
<script setup>
import { themeChange } from 'theme-change';
import {useMainStore} from "~/stores/main";
// const client = useSupabaseClient();
// const theme = ref('light')
// const getTheme = async () => {
//     const {data} = await client
//         .from('companies')
//         .select()
//         .eq('url', 'tojok')
//     if (data) {
//         theme.value = 'light';
//     }
// }
// getTheme();
//
// useHead({
//     htmlAttrs: {
//         'data-theme': theme
//     }
// })
const user = useSupabaseUser();
const mainStore = useMainStore();
const isOnUserPath = useRoute().path.includes('user');
if(user && !mainStore.businessInfo.id && !isOnUserPath){
    mainStore.checkForCompany();
}

if(process.client){
    themeChange(false)
}
</script>
<style>
.page-enter-active,
.page-leave-active {
    transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}
</style>
