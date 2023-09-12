export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser();
    if (to.path.includes('bussines') && !user) {
        alert('You are not loged in')
        return abortNavigation();
    }
    // In a real app you would probably not redirect every route to `/`
    // however it is important to check `to.path` before redirecting or you
    // might get an infinite redirect loop
    if (to.path !== '/') {
      return navigateTo('/')
    }
  })
  