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
        Useri : {{ user?.email }}
        <button v-if="user" @click="handleLogOut" class="border text-3xl border-blue-500 p-5 font-bold">Log out</button>
    </div>
</template>
<script setup>
    const user = useSupabaseUser();
    const client = useSupabaseClient();

    const handleLogOut = async () => {
        try {
            const {data, error} = await client.auth.signOut();
            if(error) throw error;
        } catch (error) {
            alert(error.message);
        }
    }
    console.log(user?.value, 'useriiii');
</script>