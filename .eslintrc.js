module.exports = {
  env: {
    browser: true,
    node: true
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "@vue/typescript/recommended",
    "plugin:eslint-comments/recommended",
    "prettier"
  ],
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-undef": ["off"],
    "no-console": ["off"],
    "require-await": ["off"],
    "vue/multi-word-component-names": ["off"],
    "vue/no-multiple-template-root": ["off"],
    "@typescript-eslint/no-explicit-any": ["off"],
    "import/no-unresolved": ["off"]
  }
};
