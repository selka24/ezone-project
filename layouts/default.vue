<template>
    <div>
        <lazy-header v-if="user && !isOnUserPath"/>
        <slot/>
    </div>
</template>
<script setup>
    const user = useSupabaseUser();
    const isOnUserPath = useRoute().path.includes('user');
</script>
