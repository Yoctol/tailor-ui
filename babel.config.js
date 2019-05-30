module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: process.env.BABEL_ENV === 'cjs' ? 'commonjs' : false,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    'babel-plugin-typescript-to-proptypes',
    'babel-plugin-styled-components',
    'ramda',
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
