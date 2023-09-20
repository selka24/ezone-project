<template>
   <div>
       <RegisterCompany v-if="loaded"/>
       <Loading v-else/>
   </div>
</template>
<script setup>
    import { useMainStore } from '~/stores/main';
    const mainStore = useMainStore();
    const loaded = ref(false);
    const redirect = () => {
        if(mainStore.businessInfo.id){
            navigateTo('/admin')
        }
    }

    if(!mainStore.businessInfo.id) await mainStore.checkForCompany();
    loaded.value = true;
    redirect();
</script>
