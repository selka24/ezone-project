<template>
    <lazy-header v-if="isOwner"/>
    <NuxtPage/>
</template>
<script setup>
    import {useMainStore} from "~/stores/main";

    const user = useSupabaseUser();
    const mainStore = useMainStore();

    const isOwner = computed(() => {
        if(!user?.value) return false;
        return (user.value?.app_metadata.owner === '1')
    })

    if(user){
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
