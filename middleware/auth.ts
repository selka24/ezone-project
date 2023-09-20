export default defineNuxtRouteMiddleware(to => {
    // skip middleware on server
    // if (process.server) return
    const user = useSupabaseUser();
    if(!user.value) return navigateTo('/');
})
