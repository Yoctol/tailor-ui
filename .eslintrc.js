/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['yoctol', 'plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    jest: true,
    jasmine: true,
  },
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],

    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'react/sort-comp': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/state-in-constructor': 'off',

    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-empty-function': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      jest: {
        jestConfigFile: path.join(__dirname, './jest.config.js'),
      },
    },
  },
};
