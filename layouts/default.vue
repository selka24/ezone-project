<template>
    <div>
<!--        <lazy-header v-if="user && !isOnUserPath"/>-->
        <sidebar v-if="user && !isOnUserPath"/>
        <div v-if="user && !isOnUserPath" class="ml-16">
            <slot/>
        </div>
    </div>
</template>
<script setup>
    import Sidebar from "~/components/admin/Sidebar.vue";

    const user = useSupabaseUser();
    const isOnUserPath = useRoute().path.includes('user');
</script>
