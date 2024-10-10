/**
 * 'npm init @eslint/config@latest'で生成される
 * とりあえずデフォにeslint-config-prettierだけ足して様子見
 */

import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import eslintConfigPrettier from 'eslint-config-prettier'; // ← add

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs', '**/*.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  eslintConfigPrettier,
  {
    rules: {
      /**
       * SFC.vueのtemplateブロックでhtmlタグ内の文字や属性値に全角記号があると
       * no-irregular-whitespace反応しちゃう件は暫定warnで対応
       * https://eslint.org/docs/latest/rules/no-irregular-whitespace#options
       * https://eslint.vuejs.org/rules/no-irregular-whitespace#options
       * いずれも機能しなかったので情報募集中
       */
      'no-irregular-whitespace': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];
