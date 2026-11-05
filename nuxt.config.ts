import { rooms } from './content/rooms'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-01',
  devtools: { enabled: false },

  css: ['~/assets/css/tokens.css', '~/assets/css/main.css'],

  app: {
    // baseURL comes from NUXT_APP_BASE_URL at build time (/Gasthof/ on GitHub Pages).
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'de' },
      title: 'Gasthof Barlida – Lainacherwirt | Urlaub in den Alpen',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Gasthof Barlida (Lainacherwirt) – familiengeführte Unterkunft in Lainach, zwischen Mölltal-Gletscher und Großglockner. Zimmer, Suiten & Apartments, Restaurant, Hausbar und Terrasse.',
        },
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
      siteUrl: 'https://www.gasthofbarlida.at',
      // Every page is noindex until launch. Set NUXT_PUBLIC_INDEXABLE=true
      // on the production build for the real domain.
      indexable: false,
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', ...rooms.map((room) => `/zimmer/${room.slug}`)],
    },
  },
})
