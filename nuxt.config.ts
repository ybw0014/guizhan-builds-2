import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxtjs/robots",
    "@nuxtjs/i18n",
    "@nuxt/content",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-icon",
    "nuxt-lodash",
    "nuxt-cloudflare-analytics",
    "nuxt-vitest",
    "@nuxtjs/eslint-module"
  ],
  devtools: { enabled: true },
  devServer: {
    host: "0.0.0.0"
  },
  nitro: {
    preset: "cloudflare-pages"
  },
  css: ["@/assets/styles/main.scss"],
  app: {
    head: {
      link: [
        {
          type: "text/css",
          rel: "stylesheet",
          href: "https://gzassets.cn/fonts/AlibabaPuHuiTi.css"
        }
      ]
    }
  },
  routeRules: {
    "/r2/**": { proxy: "https://builds-r2.gzassets.net/**" },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  i18n: {
    locales: [
      {
        code: "en",
        iso: "en-US",
        name: "English",
        file: "en-US.json"
      },
      {
        code: "zh-CN",
        iso: "zh-CN",
        name: "简体中文",
        file: "zh-CN.json",
        isCatchallLocale: true
      },
      {
        code: "zh-TW",
        iso: "zh-TW",
        name: "繁體中文",
        file: "zh-TW.json"
      }
    ],
    lazy: true,
    strategy: "no_prefix",
    langDir: "lang",
    defaultLocale: "en",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_locale",
      alwaysRedirect: true,
      fallbackLocale: "en"
    }
  },
  content: {
    markdown: {
      remarkPlugins: ["remark-heading-id"],
      rehypePlugins: {
        "rehype-external-links": {
          target: "_blank",
          rel: ["noopener", "noreferrer"]
        }
      }
    }
  },
  cloudflareAnalytics: {
    token: "643ef977d859464ba3617c7cda04fdf3"
  }
});
