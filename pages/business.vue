<template>
   <div>
       <RegisterCompany v-if="loaded"/>
       <Loading v-else/>
   </div>
</template>
<script setup>
    // definePageMeta({
    //     middleware: 'hasBusiness'
    // })

    import { useMainStore } from '~/stores/main';
    const user = useSupabaseUser();
    const loaded = ref(false)
    const router = useRouter();
    if(!user.value){
      router.push('/login')
    }
    const mainStore = useMainStore();

    onMounted(async () => {
       if(!mainStore.businessInfo.id) await mainStore.checkForCompany();
       loaded.value = true;
    })
</script>
