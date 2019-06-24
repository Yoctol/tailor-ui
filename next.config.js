/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires, import/no-extraneous-dependencies, @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */

const rehypePrism = require('@mapbox/rehype-prism');
const withTypescript = require('@zeit/next-typescript');
const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/,
  options: {
    hastPlugins: [rehypePrism],
  },
});

module.exports = withTypescript(
  withMDX({
    pageExtensions: ['js', 'jsx', 'mdx'],
  })
);
