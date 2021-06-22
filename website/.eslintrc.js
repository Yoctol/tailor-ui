module.exports = {
  rules: {
    // Ignore certain webpack alias because it can't be resolved
    'import/no-unresolved': [
      'error',
      { ignore: ['^@theme', '^@docusaurus', '^@generated'] },
    ],
  },
};
