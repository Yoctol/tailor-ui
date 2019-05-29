module.exports = {
  port: 3030,
  src: './docs',
  title: 'Tailor UI',
  description: 'A bespoke UI collection for building web application.',
  typescript: true,
  codeSandbox: false,
  wrapper: 'docs/DoczWrapper',
  modifyBabelRc: babelrc => {
    babelrc.plugins.push([
      'module-resolver',
      {
        root: ['../'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
          'tailor-ui': './packages/tailor-ui/src',
          '@tailor-ui/lab': './packages/tailor-ui-lab/src',
          '@tailor-ui/utils': './packages/tailor-ui-utils/src',
          '@tailor-ui/hooks': './packages/tailor-ui-hooks/src',
        },
      },
    ]);

    return babelrc;
  },
  themeConfig: {
    colors: {
      primary: '#3c5ad0',
      sidebarBg: '#fff',
    },
    styles: {
      body: {
        fontFamily: 'Roboto',
      },
      code: {
        fontFamily: 'Roboto Mono',
      },
      pre: {
        fontFamily: 'Roboto Mono',
      },
      table: {
        fontFamily: 'Roboto Mono',
      },
      h1: {
        fontFamily: 'Roboto',
      },
      h2: {
        fontFamily: 'Roboto',
      },
    },
  },
};
