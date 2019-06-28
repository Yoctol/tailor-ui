module.exports = {
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'no-console': 'off',
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
          ['docs', './docs'],
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
