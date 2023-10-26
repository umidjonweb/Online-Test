// https://nuxt.com/docs/api/configuration/nuxt-config
// import './assets/css/main.css'
export default defineNuxtConfig({
    postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
   css: ['~/assets/css/main.css'],
   build: {
    transpile: ['@element-plus/nuxt']
   },
   modules: ['@element-plus/nuxt', "@nuxtjs/google-fonts", '@vueuse/nuxt'],
   elementPlus: { /** Options */ },
   googleFonts:{
    families:{
      Inter: [300,400,500, 600, 700, 800],
      Montserrat:[600, 800],
      Poppins:[400, 600, 800]
    },
    download: true,
    useStylesheet: true
   }
})
