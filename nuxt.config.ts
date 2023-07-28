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
    "nuxt-cloudflare-analytics"
  ],
  devtools: { enabled: true },
  devServer: {
    host: "0.0.0.0"
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
        code: "zh-Hans",
        iso: "zh-CN",
        name: "简体中文",
        file: "zh-Hans.json"
      },
      {
        code: "zh-Hant",
        iso: "zh-TW",
        name: "繁體中文",
        file: "zh-Hant.json"
      }
    ],
    lazy: true,
    strategy: "no_prefix",
    langDir: "lang",
    defaultLocale: "en",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_lang",
      alwaysRedirect: true
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
