import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue"
  ],
  theme: {
    fontFamily: {
      "sans-sc": ["Noto Sans SC", ...defaultTheme.fontFamily.sans],
      "sans-tc": ["Noto Sans TC", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      fontFamily: {
        sans: ["Noto Sans", ...defaultTheme.fontFamily.sans]
      }
    }
  }
};
