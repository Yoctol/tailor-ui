module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    'babel-plugin-typescript-to-proptypes',
    'ramda',
    [
      'babel-plugin-styled-components',
      {
        displayName: false,
        fileName: false,
      },
    ],
  ],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'commonjs',
          },
        ],
      ],
      plugins: [
        [
          'module-resolver',
          {
            root: ['./'],
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            alias: {
              'tailor-ui': './packages/tailor-ui/src',
              '@tailor-ui/lab': './packages/tailor-ui-lab/src',
              '@tailor-ui/theme': './packages/tailor-ui-theme/src',
              '@tailor-ui/utils': './packages/tailor-ui-utils/src',
              '@tailor-ui/hooks': './packages/tailor-ui-hooks/src',
            },
          },
        ],
      ],
    },
    production: {
      ignore: ['**/__tests__', '**/**/__tests__'],
    },
  },
};
