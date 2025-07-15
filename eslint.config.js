// eslint.config.js
import js from '@eslint/js';
import * as importPlugin from 'eslint-plugin-import';

/** @type {import("eslint").Linter.FlatConfigArray} */
export default [
  js.configs.recommended,
  {
    plugins: {
      import: importPlugin
    },
    rules: {
      'import/no-unresolved': 'error',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off'
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'commonjs'
    }
  }
];
