/* eslint-disable prettier/prettier */
// Migrate built-in rules to @stylistic/js namespace
/* eslint @stylistic/migrate/migrate-js: "error" */

// Migrate `@typescript-eslint` rules to @stylistic/ts namespace
/* eslint @stylistic/migrate/migrate-ts: "error" */

module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'prettier',
    'fsd-custom-sorrint',
    '@stylistic',
    '@stylistic/migrate',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
        disallowTypeAnnotations: false,
      },
    ],
    'prettier/prettier': [
      'error',
      {
        'endOfLine': 'auto',
      },
    ],
    '@typescript-eslint/ban-ts-comment': 0,
    'react/display-name': 'error',
    'react/prop-types': 0,
    '@typescript-eslint/no-explicit-any': [1, { ignoreRestArgs: true }],
    'fsd-custom-sorrint/path-checker': [2, { alias: '@' }],
    'fsd-custom-sorrint/public-api-imports': [2, { alias: '@' }],
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/semi': [2, 'always'],
    'react-hooks/exhaustive-deps': 'error'
  },
};
