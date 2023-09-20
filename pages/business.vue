<template>
   <div>
       <RegisterCompany />
   </div>
</template>
<script setup>
    definePageMeta({
        middleware: ['auth', 'company']
    })
</script>
