<template>
    <div class="p-5 flex justify-center mt-20">
            <div v-if="bookingCompany" class="card items-center w-full max-w-lg bg-base-100 shadow-2xl">
                <div class="card-body gap-10 items-center text-center prose w-full">
<!--                    {{bookingCompany}}-->
                    <div>
                        <h2 class="card-title">
                            {{bookingCompany.name}}
                        </h2>
                        <p>{{ bookingCompany.description }}</p>
                    </div>
                    <service-select/>
                    <booking-calendar/>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Shiko Oraret</button>
                    </div>
                </div>
            </div>
        <h1 v-else>
            {{ username?.toUpperCase() }} doesn't exist
        </h1>
    </div>
</template>
<script setup>
    import {useBookingStore} from "~/stores/booking";
    import BookingCalendar from "~/components/booking/BookingCalendar.vue";
    import {useMainStore} from "~/stores/main";
    import ServiceList from "~/components/admin/ServiceList.vue";
    import ServiceSelect from "~/components/booking/ServiceSelect.vue";

    const route = useRoute();
    const {username} = route.params;
    const bookingStore = useBookingStore();
    const mainStore = useMainStore();



    const bookingCompany = computed(() => {
        return mainStore.businessInfo
    })

    console.log(username, 'routeeee')
    if(username){
        mainStore.checkForCompany(username);
    }
</script>
