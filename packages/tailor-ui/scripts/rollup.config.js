import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

const input = 'lib/index.js';
const name = 'tailor-ui';
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  styled: 'styled',
  stream: 'stream',
};
const babelOptions = {
  exclude: /node_modules/,
  runtimeHelpers: true,
  configFile: '../../babel.config.js',
};
const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/,
  namedExports: {
    '../../node_modules/react-is/index.js': [
      'isElement',
      'isValidElementType',
      'ForwardRef',
    ],
    '../../node_modules/draft-js/lib/Draft.js': [
      'convertToRaw',
      'genKey',
      'convertFromHTML',
      'Editor',
      'ContentState',
      'CharacterMetadata',
      'ContentBlock',
      'EditorState',
      'SelectionState',
      'BlockMapBuilder',
      'CompositeDecorator',
      'Modifier',
      'KeyBindingUtil',
      'DefaultDraftBlockRenderMap',
      'DefaultDraftInlineStyle',
      'getDefaultKeyBinding',
    ],
    '../../node_modules/rc-editor-core/node_modules/immutable/dist/immutable.js': [
      'is',
      'List',
      'Map',
      'fromJS',
      'OrderedSet',
      'Repeat',
    ],
    '../../node_modules/immutable/dist/immutable.js': ['Map'],
    '../../node_modules/draft-js/lib/DraftOffsetKey.js': ['decode'],
  },
};

export default [
  {
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
  },
  {
    input,
    output: {
      file: `lib/${name}.umd.js`,
      format: 'umd',
      name,
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      json(),
      nodeResolve(),
      babel(babelOptions),
      commonjs(commonjsOptions),
      sizeSnapshot(),
    ],
  },
];
