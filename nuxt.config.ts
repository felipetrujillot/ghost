import type { NuxtPage } from '@nuxt/schema'
import process from 'node:process'

const sw = process.env.SW === 'true'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@vite-pwa/nuxt',
    '@nuxt/content',
  ],

  devtools: { enabled: false },

  future: {
    compatibilityVersion: 4,
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    /* prerender: {
      routes: ['*'],
    }, */
  },
  pwa: {
    strategies: sw ? 'injectManifest' : 'generateSW',
    srcDir: sw ? 'service-worker' : undefined,
    filename: sw ? 'sw.ts' : undefined,
    registerType: 'autoUpdate',
    manifest: {
      display: 'standalone',
      name: 'undefined',
      short_name: 'undefined',
      theme_color: '#181621',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
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
