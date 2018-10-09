import commonjs from 'rollup-plugin-commonjs';

export default {
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