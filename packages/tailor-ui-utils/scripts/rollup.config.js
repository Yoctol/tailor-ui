// eslint-disable-next-line import/no-extraneous-dependencies
import commonjs from 'rollup-plugin-commonjs';

const input = 'lib/index.js';
const name = '@tailor-ui/utils';

export default {
  input,
  output: [
    {
      file: 'lib/index.cjs.js',
      format: 'umd',
      name,
      sourcemap: false,
    },
  ],
  plugins: [commonjs()],
};
