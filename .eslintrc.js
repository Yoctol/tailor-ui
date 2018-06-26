module.exports = {
  parser: 'babel-eslint',
  extends: ['yoctol'],
  plugins: ['prettier'],
  env: {
    browser: true,
    node: true,
    jest: true,
    jasmine: true,
  },
  rules: {
    'react/destructuring-assignment': 'off',
  },
  settings: {
    'import/resolver': {
      jest: {},
    },
  },
};
