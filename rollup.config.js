const commonjs = require('rollup-plugin-commonjs');

module.exports = {
  input: 'lib/index.js',
  output: [
    {
      file: 'lib/index.umd.js',
      format: 'umd',
      name: '@yoctol/ui',
      sourcemap: false,
      exports: 'named',
    },
  ],
  plugins: [commonjs()],
};
