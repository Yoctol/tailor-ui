import commonjs from '@rollup/plugin-commonjs';

const entryPoints = [
  { input: './lib/index.js', output: './lib/index.cjs.js' },
  { input: './lib/formik/index.js', output: './lib/formik/index.cjs.js' },
  { input: './lib/theme/index.js', output: './lib/theme/index.cjs.js' },
  { input: './lib/utils/index.js', output: './lib/utils/index.cjs.js' },
  { input: './lib/lab/index.js', output: './lib/lab/index.cjs.js' },
];

export default function rollup() {
  return entryPoints.map(({ input, output }) => ({
    input,
    output: [
      {
        file: output,
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
        externalLiveBindings: false,
      },
    ],
    plugins: [commonjs()],
  }));
}
