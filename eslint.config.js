import js from '@eslint/js'
import globals from 'globals'
import eslintReact from 'eslint-plugin-react'
import eslintReactHooks from 'eslint-plugin-react-hooks'
import eslintPrettier from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'
// import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsEslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default tsEslint.config(
  {
    plugins: {
      '@stylistic': stylistic,
      '@typescript-eslint': tsEslint.plugin,
      'react-hooks': eslintReactHooks,
      react: eslintReact,
      prettier: eslintPrettier,
    }
  },
  {
    ignores: ['node_modules', 'dist', 'eslint.config.js', '.storybook', 'config']
  },
  js.configs.recommended,
  ...tsEslint.configs.recommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2024
      },
      parserOptions: {
        project: ['tsconfig.json', 'tsconfig.node.json', 'tsconfig.eslint.json'],
      }
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      ...eslintPrettier.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
       "@typescript-eslint/no-explicit-any": ["error", {ignoreRestArgs: true}]
    }
  },
)