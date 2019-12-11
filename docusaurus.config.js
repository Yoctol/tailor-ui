/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: 'Tailor UI',
  tagline: 'A bespoke UI collection for building web application.',
  url: 'https://tailor-ui-netlify.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'Yoctol.AI', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.
  themes: ['@docusaurus/theme-live-codeblock'],
  themeConfig: {
    disableDarkMode: true,
    prism: {
      // eslint-disable-next-line import/no-extraneous-dependencies
      theme: require('prism-react-renderer/themes/oceanicNext'),
    },
    navbar: {
      title: 'Tailor UI',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      links: [
        { to: 'docs/get-started', label: 'Docs', position: 'left' },
        {
          href: 'https://github.com/yoctol/tailor-ui',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: '© 2019 - PRESENT YOCTOL INFO INC. ALL RIGHTS RESERVED.',
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
