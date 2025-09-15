import { defineConfig } from 'eslint/config'
import type { Linter } from 'eslint'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import typescriptEslint from 'typescript-eslint'
import commonRules from './lint-options/common-rules'

export default defineConfig([
  {
    files: ['build/**/*.ts', 'src/**/*.ts'],
    extends: [
      js.configs.recommended,
      ...typescriptEslint.configs.recommendedTypeChecked,
    ],
    languageOptions: {
      globals: {
        ...globals.browser
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      }
    },
    rules: {
      ...commonRules as unknown as Partial<Linter.RulesRecord>,
      "@typescript-eslint/ban-ts-comment": "off"
    }
  },
  {
    files: ['src/**/*.vue'],
    extends: [
      js.configs.recommended,
      ...typescriptEslint.configs.recommended,
      ...pluginVue.configs['flat/vue2-recommended']
    ],
    languageOptions: {
      globals: {
        ...globals.browser
      },
      parserOptions: {
        parser: typescriptEslint.parser,
        extraFileExtensions: ['.vue']
      }
    },
    rules: {
      'vue/v-bind-style': 'error',
      'vue/no-console': 'error',
      'vue/require-default-prop': 'off',
      'vue/max-attributes-per-line': "off",
      ...commonRules as unknown as Partial<Linter.RulesRecord>
    },
  }
])
