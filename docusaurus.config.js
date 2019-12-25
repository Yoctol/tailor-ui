/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: 'Tailor UI',
  tagline: 'A bespoke UI collection for building web application',
  url: 'https://tailor-ui.netlify.com',
  baseUrl: '/',
  favicon: 'img/favicon.png',
  organizationName: 'Yoctol.AI', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.
  themes: ['@docusaurus/theme-live-codeblock'],
  stylesheets: [
    'https://fonts.googleapis.com/css?family=Montserrat:700|Roboto&display=swap',
  ],
  themeConfig: {
    disableDarkMode: true,
    sidebarCollapsible: false,
    image: 'img/og-image.png',
    prism: {
      // eslint-disable-next-line import/no-extraneous-dependencies
      theme: require('prism-react-renderer/themes/oceanicNext'),
    },
    navbar: {
      logo: {
        alt: 'Tailor UI',
        src: 'img/tailor-ui-horizon.svg',
      },
      links: [
        { to: 'docs/getting-started', label: 'Docs', position: 'left' },
        {
          href: 'https://github.com/yoctol/tailor-ui',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: '© 2019 - PRESENT YOCTOL.AI ALL RIGHTS RESERVED.',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
