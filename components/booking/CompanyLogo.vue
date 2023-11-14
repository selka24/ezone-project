<script setup lang="ts">
const mainStore = useMainStore();
const {public: {logoUrl}} = useRuntimeConfig();

const bookingCompany = computed(() => {
    return mainStore.businessInfo
})
</script>

<template>
    <div class="flex flex-col justify-between items-center gap-x-5 gap-y-2">
        <!--                    <h3 class="card-title">-->
        <!--                        {{bookingCompany.name}}-->
        <!--                    </h3>-->
        <nuxt-img
            format="webp"
            width="150"
            height="150"
            class="w-auto h-[150px] rounded-full"
            :src="`${logoUrl}/${bookingCompany.logo_url}`"
            alt="business-logo"/>
        <!--                    <p>{{ bookingCompany.description }}</p>-->
    </div>
</template>

<style scoped>

</style>
