<template>
    <div>
<!--        <lazy-header v-if="user && !isOnUserPath"/>-->
        <sidebar v-if="user && !isOnUserPath"/>
        <div class="ml-32">
            <slot/>
        </div>
    </div>
</template>
<script setup>
    import Sidebar from "~/components/admin/Sidebar.vue";

    const user = useSupabaseUser();
    const isOnUserPath = useRoute().path.includes('user');
</script>
