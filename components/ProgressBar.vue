<template>
    <div class="mb-5 h-2 rounded-full bg-gray-200">
        <div class="h-2 rounded-full bg-blue-500" :style="calculateWidth"></div>
    </div>
</template>
<script setup>
    const props = defineProps(['progress', 'steps']);

    const calculateWidth = computed(() => {
        return `width: ${(props.progress/props.steps) * 100}%`
    })
</script>