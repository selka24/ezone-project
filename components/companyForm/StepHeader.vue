<template>
    <h2 class="text-base font-semibold leading-7 text-gray-900">{{ props.title }}</h2>
    <p class="mt-1 text-sm leading-6 text-gray-600">{{ props.description }}</p>
</template>
<script setup>
    const props = defineProps(['title', 'description'])
</script>