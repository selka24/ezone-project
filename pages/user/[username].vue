<template>
    <div class="p-5">
        <h1>
            ROUTE
            {{ params?.username }}
        </h1>
    </div>
</template>
<script setup>
    const route = useRoute();
    const params = route.params
    console.log(route, 'routeeee')
</script>