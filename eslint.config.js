const { defineConfig } = require('eslint/config')
const js = require('@eslint/js')
const plguinVue = require('eslint-plugin-vue')
const globals = require('globals')

module.exports = defineConfig([
  // 校验 .vue 文件
  {
    files: ['src/components/Tree/**'],
    extends: [
      ...plguinVue.configs['flat/vue2-recommended']
    ],
    rules: {
      'vue/require-default-prop': "off",
      "vue/max-attributes-per-line": ["error", {
        "singleline": {
          "max": 3
        },
        "multiline": {
          "max": 2
        }
      }]
    }
  },
  // 校验 js 代码
  {
    files: ['src/**'],
    plugins: {
      js
    },
    extends: [
      js.configs.recommended
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: "error"
    },
    rules: {
      // 基本规则
      'no-console': 'error', // 禁止使用console
      'no-debugger': 'error', // 禁止使用debugger
      'no-alert': 'error', // 禁止使用alert
      'no-unused-vars': 'error', // 禁止未使用的变量
      'no-undef': 'error', // 禁止使用未声明的变量

      // 代码风格
      'semi': ['error', 'never'], // 要求分号
      'quotes': ['error', 'single'], // 使用单引号
      'indent': ['error', 2], // 2空格缩进
      'comma-dangle': ['error', 'never'], // 禁止尾随逗号
      'object-curly-spacing': ['error', 'always'], // 对象花括号内空格

      // 最佳实践
      'eqeqeq': 'error', // 必须使用 === 和 !==
      // 'curly': 'error', // 必须使用大括号
      'default-case': 'error', // switch必须有default
      'dot-notation': 'error', // 强制使用点号表示法
      'no-eval': 'error', // 禁止使用eval
    }
  }
])