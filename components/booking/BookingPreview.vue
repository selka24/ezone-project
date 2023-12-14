<script setup>
    const props = defineProps(['booking'])
</script>

<template>
    <div class="flex flex-col gap-2">
        <div v-if="booking">
            <div>
                Emri: {{booking.client_name}}
            </div>
            <div>
                Orari rezervimit: {{booking.start_time}}
            </div>
            <div>
                Sherbimi: {{booking.services.name}}
            </div>
            <div>
                Stafi: {{booking.employees.name}}
            </div>
            <div>
                {{booking}}
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
