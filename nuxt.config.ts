import { rooms } from './content/rooms'

const localeCodes = ['de', 'en', 'it', 'nl', 'ro']
const siteUrl = 'https://www.gasthofbarlida.at'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-01',
  devtools: { enabled: false },

  modules: ['@nuxtjs/i18n'],

  // Copy lives in content/locales/*.ts (typed against German); the module
  // only provides localized routes, the switcher paths and hreflang.
  i18n: {
    locales: [
      { code: 'de', language: 'de-AT', name: 'Deutsch' },
      { code: 'en', language: 'en', name: 'English' },
      { code: 'it', language: 'it', name: 'Italiano' },
      { code: 'nl', language: 'nl', name: 'Nederlands' },
      { code: 'ro', language: 'ro', name: 'Română' },
    ],
    defaultLocale: 'de',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    // Origin used for hreflang URLs; override with NUXT_PUBLIC_I18N_BASE_URL.
    // Origin only — the module appends app.baseURL (/Gasthof/) itself.
    baseUrl: siteUrl,
  },

  css: ['~/assets/css/tokens.css', '~/assets/css/main.css'],

  app: {
    // baseURL comes from NUXT_APP_BASE_URL at build time (/Gasthof/ on GitHub Pages).
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Gasthof Barlida – Lainacherwirt | Urlaub in den Alpen',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#16201b' },
        { property: 'og:site_name', content: 'Gasthof Barlida' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap',
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      // Override with NUXT_PUBLIC_SITE_URL. Used for canonical and og: URLs.
      siteUrl,
      // Every page is noindex until launch. Set NUXT_PUBLIC_INDEXABLE=true
      // on the production build for the real domain.
      indexable: false,
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: localeCodes.flatMap((code) => {
        const prefix = code === 'de' ? '' : `/${code}`
        return [`${prefix}/`, ...rooms.map((room) => `${prefix}/zimmer/${room.slug}`)]
      }),
    },
  },
})
