import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginJest from 'eslint-plugin-jest'

export default defineConfig([
  {
    ignores: ['**/coverage/', '*.config.js'],
  },
  { files: ['**/*.{js,mjs,cjs}'] },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['src/browser/*.js'], // browser/ディレクトリのファイルにのみ適用
    languageOptions: {
      parserOptions: {
        sourceType: 'script', // モジュールではなくscriptとして解釈
      },
    },
    rules: {
      'no-unused-vars': 'off', // browser/ディレクトリ内では未使用変数を無視
    },
  },
  {
    // update this to match your test files
    files: ['**/*.test.js'],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },
])
