<template>
   <div>
       <RegisterCompany v-if="loaded"/>
       <Loading v-else/>
   </div>
</template>
<script setup>
   import { useMainStore } from '~/stores/main';
   const user = useSupabaseUser();
   const loaded = ref(false)

   if(!user.value){
      const router = useRouter();
      router.push('/login')
   }

   loaded.value = true;
   const mainStore = useMainStore();
   mainStore.checkForCompany();
</script>