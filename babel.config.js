module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    ['@babel/preset-react', { useSpread: true }],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      // By default, it assumes @babel/runtime@7.0.0. Since we use >7.0.0, better to
      // explicitly specify the version so that it can reuse the helper better
      // See https://github.com/babel/babel/issues/10261
      // eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
      { version: require('@babel/runtime/package.json').version },
    ],
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
