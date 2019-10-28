const path = require('path');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'yoctol',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
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
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'react/sort-comp': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/state-in-constructor': 'off',

    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['tailor-ui', './packages/tailor-ui/src'],
          ['@tailor-ui/lab', './packages/tailor-ui-lab/src'],
          ['@tailor-ui/theme', './packages/tailor-ui-theme/src'],
          ['@tailor-ui/utils', './packages/tailor-ui-utils/src'],
          ['@tailor-ui/hooks', './packages/tailor-ui-hooks/src'],
          ['@tailor-ui/formik', './packages/tailor-ui-formik/src'],
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      jest: {
        jestConfigFile: path.join(__dirname, './jest.config.js'),
      },
    },
  },
};
