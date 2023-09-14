<template>
     <form @submit.prevent="handleSubmit">
        <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
                <CompanyFormStepHeader title="Business employees" description="Below you can search users and add them as employees."/>
                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-4">
                        <SearchSelect
                            :options="mainStore.users"
                            display-key="full_name"
                            @optionSelect="handleUserSelect"
                            @searchChange="handleSearchChange"
                        />
                    </div>
                </div>
                <div v-for="user in selectedUsers">{{ user }}</div>
            </div>
        </div>
     </form>
</template>
<script setup>
    import { useMainStore } from '~/stores/main';

    const mainStore = useMainStore();

    const selectedUsers = ref([])

    const handleSearchChange = (text) => {
        mainStore.searchUsers(text);
    }

    // const filteredUsers = computed(() => {
    //     return mainStore.users.filter(user => {
    //         const idx = selectedUsers.findIndex(x => x.id === user.id);
    //         if(idx < 0) return user;
    //     })
    // })

    const handleUserSelect = (user) => {
        const idx = selectedUsers.value.findIndex(x => x.id === user.id);
        if(idx < 0) selectedUsers.value = [user, ...selectedUsers.value];
    }

    const handleSubmit = () => {
        
    }
</script>