module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    '@guizhan/eslint-config',
    '@nuxtjs/eslint-config-typescript',
    'plugin:vue/vue3-recommended',
    'prettier'
  ],
  rules: {
    'no-undef': ['off'],
    'no-console': ['off'],
    'vue/multi-word-component-names': ['off'],
    'vue/no-multiple-template-root': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-unused-vars': ['warn'],
    'import/no-unresolved': ['off']
  }
};
