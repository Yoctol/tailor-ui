/* eslint import/no-extraneous-dependencies: off */
import commonjs from 'rollup-plugin-commonjs';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

export default {
  input: 'lib/index.js',
  output: [
    {
      file: 'lib/index.cjs.js',
      format: 'umd',
      name: '@tailor-ui/utils',
      sourcemap: false,
    },
  ],
  plugins: [sizeSnapshot(), commonjs()],
};
