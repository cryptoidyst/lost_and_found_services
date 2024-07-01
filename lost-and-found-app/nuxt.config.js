export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  server:{
    host: "0.0.0.0",
    port: "3000"
  },
  head: {
    title: 'lost-and-found-app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon',  href: '/logo.jpeg' },
      {
        rel: 'apple-touch-icon',
        type: 'image/png',
        href: '/logo.jpeg'
      }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~/node_modules/bootstrap/dist/css/bootstrap.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt'
  ],
  axios: {
    baseURL: process.env.LOST_AND_FOUND_SERVICE_URL
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/]
  },
  env: {
    LOST_AND_FOUND_SERVICE_URL: "http://26.42.232.247:5001"
  },
  router: {
    middleware: ['authentication']
  },
}
