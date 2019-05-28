// eslint-disable-next-line import/no-extraneous-dependencies
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'lib/index.js',
  output: [
    {
      file: 'lib/index.cjs.js',
      format: 'umd',
      name: '@tailor-ui/hooks',
      sourcemap: false,
    },
  ],
  plugins: [commonjs()],
};
