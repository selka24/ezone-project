export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser();
    const noAuthPaths = [
        '/register',
        '/login'
    ]

    if (user?.value && noAuthPaths.findIndex(x => x === to.path) >= 0) {
        return navigateTo('/')
    }
  })
  