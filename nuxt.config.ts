// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    pageTransition: {
      name: 'page',
      mode: 'out-in' // default
    },
    layoutTransition: {
        name: 'slide',
        mode: 'out-in' // default
    },
  },
  image: {
    domains: ['vzyfityiyitbvrnvhbld.supabase.co'],
    screens: {
      icon: 40,
      avatar: 24
    }
  },
  devtools: { enabled: false },
  modules: [
    '@nuxt/image-edge',
    '@nuxtjs/supabase',
    '@pinia/nuxt'
  ],
  supabase:{
    redirect: false
  },
  imports: {
      dirs: ['./stores'],
  },
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
})
