import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs} from '@vue/eslint-config-typescript'

export default defineConfigWithVueTs(
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**'],
  },
  {
    files: ['src/**/*.ts', 'src/**/*.vue'],
    rules: {
      quotes: ['warn', 'single'],
      'comma-dangle': ['error', 'always-multiline'],
      'one-var': 'off',
      'semi': ['warn', 'never'],
      'array-bracket-spacing': ['warn', 'never'],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    }
  },
  {
    files: ['src/**/*.vue'],
    rules: {
      'vue/no-v-html': 'off',
      'vue/no-v-text-v-html-on-component': 'off',
      'vue/html-self-closing': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/require-default-prop': 'off',
      "vue/max-attributes-per-line": ["warn", {
        "singleline": 4,
        "multiline": 1,
      }]
    }
  },
)
