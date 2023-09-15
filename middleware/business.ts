export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser();
    console.log(user, 'user main var');
    console.log(user?.value, 'user value');
    console.log(user?.value?.id, 'user id');

    // if (!user?.value) return navigateTo('/redirect')
})
  