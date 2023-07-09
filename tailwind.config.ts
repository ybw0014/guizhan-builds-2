import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  darkMode: ["class", ".dark-mode"],
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["AlibabaPuHuiTi", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [require("@headlessui/tailwindcss")]
};
