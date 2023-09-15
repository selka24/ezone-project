export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser();
    console.log(user, 'useriiiiiii')
    // if (!user?.value) return navigateTo('/redirect')
})
  