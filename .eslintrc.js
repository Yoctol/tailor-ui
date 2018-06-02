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
};
