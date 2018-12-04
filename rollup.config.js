import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'lib/index.js',
  output: [
    {
      file: 'lib/index.umd.js',
      format: 'umd',
      name: 'tailor-ui',
      sourcemap: false,
    },
  ],
  plugins: [commonjs()],
};
