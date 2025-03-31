import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'

export default defineConfig([
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
    files: ['src/markdown-text-processor/browser/*.js'], // browser/ディレクトリのファイルにのみ適用
    languageOptions: {
      parserOptions: {
        sourceType: 'script', // モジュールではなくscriptとして解釈
      },
    },
    rules: {
      'no-unused-vars': 'off', // browser/ディレクトリ内では未使用変数を無視
    },
  },
])
