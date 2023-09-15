<template>
   <div>
       <RegisterCompany/>
   </div>
</template>
<script setup>
   import { useMainStore } from '~/stores/main';

   const {params} = useRoute();
   const mainStore = useMainStore();

   mainStore.checkForCompany();
</script>