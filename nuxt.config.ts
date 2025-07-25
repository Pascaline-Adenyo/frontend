// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    pages: true,
  css: ['~/assets/css/main.css'],
  modules:['@pinia/nuxt'] , 
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})