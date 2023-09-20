<template>
    <div>
        <lazy-header v-if="mainStore.isOwner"/>
        <NuxtPage/>
    </div>
</template>
<script setup>
    import {useMainStore} from "~/stores/main";
    const user = useSupabaseUser();
    const mainStore = useMainStore();

    if(user && !mainStore.businessInfo.id){
        mainStore.checkForCompany();
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
