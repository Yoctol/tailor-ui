module.exports = {
  title: 'Tailor UI',
  tagline: 'A bespoke UI collection for building web application',
  url: 'https://tailor-ui.netlify.app',
  baseUrl: '/',
  favicon: 'img/favicon.png',
  organizationName: 'Yoctol.AI', // Usually your GitHub org/user name.
  projectName: 'tailor-ui', // Usually your repo name.
  themes: ['@docusaurus/theme-live-codeblock'],
  stylesheets: [
    'https://fonts.googleapis.com/css?family=Montserrat:700|Roboto&display=swap',
  ],
  themeConfig: {
    colorMode: {
      disableSwitch: true,
    },
    sidebarCollapsible: false,
    image: 'img/og-image.png',
    prism: {
      theme: require('prism-react-renderer/themes/oceanicNext'),
    },
    navbar: {
      title: 'Tailor UI',
      logo: {
        alt: 'Tailor UI',
        src: 'img/tailor-ui-horizon.svg',
      },
      items: [
        { to: 'docs', label: 'Docs', position: 'left' },
        {
          href: 'https://github.com/yoctol/tailor-ui',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `© ${new Date().getFullYear()} - PRESENT YOCTOL.AI ALL RIGHTS RESERVED.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/Yoctol/tailor-ui/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
