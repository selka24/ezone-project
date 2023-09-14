<template>
<h1>
    {{ params?.business_name }}
</h1>
</template>
<script setup>
    const route = useRoute();
    const params = route.params
</script>