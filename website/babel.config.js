module.exports = {
  presets: ['@docusaurus/core/lib/babel/preset'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    ['@babel/plugin-proposal-private-methods', { loose: false }],
  ],
};
