// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
  devtools: { enabled: false },

  build: {
    transpile: ['trpc-nuxt'],
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui',
  },

  runtimeConfig: {
    jwtSecret: process.env.NUXT_JWT_SECRET,
    dbPassword: process.env.NUXT_DB_PASSWORD || '',
    dbHost: process.env.NUXT_DB_HOST || '',
    dbUser: process.env.NUXT_DB_USER || 'root',

    public: {
      projectName: process.env.NUXT_PROJECT_NAME || 'NUXT',
    },
  },
})
