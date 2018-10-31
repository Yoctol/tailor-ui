module.exports = {
  port: 3030,
  src: './src',
  title: '@yoctol/ui',
  description: 'Yoctol UI components',
  typescript: true,
  codeSandbox: false,
  wrapper: 'docz/DoczWrapper',
  themeConfig: {
    showPlaygroundEditor: false,
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
    },
  },
};
