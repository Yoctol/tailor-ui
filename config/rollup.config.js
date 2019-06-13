import commonjs from 'rollup-plugin-commonjs';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

export function rollup({ name }) {
  return {
    input: 'lib/index.js',
    output: [
      {
        file: 'lib/index.cjs.js',
        format: 'umd',
        name,
        sourcemap: false,
      },
    ],
    plugins: [sizeSnapshot(), commonjs()],
  };
}
