import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'lib/index.browser.js',
  output: [
    {
      file: 'lib/index.umd.js',
      format: 'umd',
      name: '@yoctol/ui',
      sourcemap: false,
    },
  ],
  plugins: [commonjs()],
};
