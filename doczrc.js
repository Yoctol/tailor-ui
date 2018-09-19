import * as colors from './src/theme/colors.ts';

module.exports = {
  port: 3030,
  src: './src',
  title: '@yoctol/ui',
  description: 'Yoctol UI components',
  typescript: true,
  wrapper: 'docz/DoczWrapper',
  themeConfig: {
    colors: {
      primary: colors.primary,
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
    },
  },
};
