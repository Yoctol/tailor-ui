module.exports = {
  port: 3030,
  src: './src',
  title: 'Tailor UI',
  description: 'A bespoke UI collection for building web application.',
  typescript: true,
  codeSandbox: false,
  wrapper: 'docz/DoczWrapper',
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
    },
  },
};
