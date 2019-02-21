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
        },
      },
    ]);

    return babelrc;
  },
  htmlContext: {
    head: {
      raw: `
        <style>
          * {
            box-sizing: border-box;
          }
          #root > div > div:first-of-type {
            width: 350px;
            min-width: 350px;
          }
          #root > div > div:first-of-type > div:first-of-type {
            padding: 30px;
            width: 350px;
            min-width: 350px;
          }
          #root > div > div:first-of-type > div:first-of-type > div:last-of-type {
            display: none;
          }
          #root > div > div:first-of-type > div:first-of-type > div:nth-child(2):before {
            background: transparent;
          }
          #root > div > div:first-of-type > div:first-of-type > div:nth-child(2) h1 {
            font-size: 2.5em;
            font-weight: 100;
          }
        </style>
      `,
    },
  },
  themeConfig: {
    colors: {
      primary: '#423b63',
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
