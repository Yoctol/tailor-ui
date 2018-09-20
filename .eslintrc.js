module.exports = {
  parser: 'typescript-eslint-parser',
  extends: ['yoctol'],
  plugins: ['prettier', 'typescript'],
  parserOptions: {
    sourceType: 'module',
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
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'react/sort-comp': 'off',
    'no-restricted-globals': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-multi-str': 'off',
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      jest: {
        jestConfigFile: './jest.config.js',
      },
    },
  },
};
