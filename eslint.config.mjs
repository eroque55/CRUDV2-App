/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */

import { defineConfig, globalIgnores } from 'eslint/config';
import react from 'eslint-plugin-react';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions';
import { fixupPluginRules } from '@eslint/compat';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores([
    '**/*.js',
    '**/node_modules',
    '**/build',
    '**/android',
    '**/ios',
  ]),

  // Espalhando os extends compatíveis
  ...compat.extends(
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ),

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 13,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        __DEV__: 'readonly',
      },
    },
    plugins: {
      react,
      'react-hooks': fixupPluginRules(reactHooks),
      '@typescript-eslint': typescriptEslint,
      prettier,
      'prefer-arrow-functions': preferArrowFunctions,
    },
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'off',
      'react/require-default-props': 'off',
      'react/prop-types': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'react/jsx-props-no-spreading': 'off',
      'import/prefer-default-export': 'off',
      'react/jsx-no-bind': 'off',
      'no-param-reassign': 'off',
      'import/no-duplicates': 'off',
      camelcase: 'off',
      'no-plusplus': 'off',
      'object-curly-newline': 'off',
      'consistent-return': 'off',
      'arrow-parens': 'off',
      'no-shadow': 'off',
      'no-useless-constructor': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-shadow': 'error',

      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
      'no-use-before-define': 'off',
      'react/react-in-jsx-scope': 'off',

      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
          tsx: 'never',
        },
      ],

      'prettier/prettier': 'error',

      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],

      curly: ['error', 'all'],

      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react',
              importNames: ['React'],
              message: 'Unexpected React import',
            },
          ],
        },
      ],

      'react/jsx-no-constructed-context-values': 'off',

      'react/no-unstable-nested-components': [
        'error',
        {
          allowAsProps: true,
        },
      ],

      'prefer-arrow-functions/prefer-arrow-functions': [
        'warn',
        {
          classPropertiesAllowed: false,
          disallowPrototype: false,
          returnStyle: 'unchanged',
          singleReturnOnly: false,
        },
      ],

      'react/style-prop-object': [
        'error',
        {
          allow: ['StatusBar'],
        },
      ],
    },
  },
]);
