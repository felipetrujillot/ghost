import type { NuxtPage } from '@nuxt/schema'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', 'nuxt-electron'],

  devtools: { enabled: false },

  electron: {
    disableDefaultOptions: true,
    build: [
      {
        // Main-Process entry file of the Electron App.
        entry: 'electron/main.ts',
      },
    ],
  },

  future: {
    compatibilityVersion: 4,
  },
  tailwindcss: {
    viewer: false,
  },

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
    componentDir: './app/components/ui',
  },
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      htmlAttrs: {
        lang: 'es-CL',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/icon.svg',
        },
      ],
    },
  },

  hooks: {
    'pages:extend'(pages) {
      /**
       *
       * @param pattern
       * @param pages
       */
      function removePagesMatching(pattern: RegExp, pages: NuxtPage[] = []) {
        const pagesToRemove: NuxtPage[] = []
        for (const page of pages) {
          if (page.file && pattern.test(page.file)) {
            pagesToRemove.push(page)
          } else {
            removePagesMatching(pattern, page.children)
          }
        }
        for (const page of pagesToRemove) {
          pages.splice(pages.indexOf(page), 1)
        }
      }
      removePagesMatching(/_components/, pages)
    },
  },

  runtimeConfig: {
    jwtSecret: process.env.NUXT_JWT_SECRET,
    dbPassword: process.env.NUXT_DB_PASSWORD || '',
    dbHost: process.env.NUXT_DB_HOST || '',
    dbUser: process.env.NUXT_DB_USER || 'root',
    dbName: process.env.NUXT_DB_NAME,

    public: {
      projectName: process.env.NUXT_PROJECT_NAME,
    },
  },
  compatibilityDate: '2024-07-18',
})
