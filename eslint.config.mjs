import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettier from 'eslint-plugin-prettier'
import importPlugin from 'eslint-plugin-import'
import unusedImports from 'eslint-plugin-unused-imports'

export default [
  {
    // files to lint
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module'
      }
    },

    plugins: {
      '@typescript-eslint': tseslint,
      prettier,
      import: importPlugin,
      'unused-imports': unusedImports
    },

    rules: {
      // style
      semi: ['error', 'never'],
      'prettier/prettier': ['error', { semi: false }],

      // unused imports/variables
      'unused-imports/no-unused-imports': 'error',

      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ],

      // optional
      'no-console': 'off'
    }
  }
]
