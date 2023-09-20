<template>
    <div class="text-center mt-10 flex flex-col gap-5">
        <div class="flex gap-10 justify-center">
            <NuxtLink v-if="!user" to="/register" class="border p-5 border-blue-500">
                Register User
            </NuxtLink>
            <NuxtLink v-if="!user" to="/login" class="border p-5 border-blue-500">
                Login
            </NuxtLink>
        </div>
        <div class="flex flex-col text-left p-10 gap-5">
          <div class="border border-gray-200 rounded-xl max-w-max p-5">
              Useri : {{ user?.email }}
          </div>
          <NuxtLink :to="mainStore.businessInfo.id ? '/admin' : '/business'" class="border border-gray-200 rounded-xl max-w-max p-5">
              Company : {{ mainStore.businessInfo.name || (mainStore.isOwner ? 'Create company' : 'You need owner permissions') }}
          </NuxtLink>
        </div>
    </div>
</template>
<script setup>
    import { useMainStore } from '~/stores/main';

    const user = useSupabaseUser();
    const mainStore = useMainStore();


</script>
