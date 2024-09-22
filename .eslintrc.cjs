/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'quotes': ['warn', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
    'one-var': 'off',
    'semi': ['warn', 'never'],
    'array-bracket-spacing': ['warn', 'never'],
    'vue/html-self-closing': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/require-default-prop': 'off',
  },
  ignorePatterns: ["dist/**/*"],
}
