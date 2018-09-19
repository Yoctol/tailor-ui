module.exports = {
  coverageDirectory: './coverage/',
  transformIgnorePatterns: ['/node_modules/'],
  testPathIgnorePatterns: ['/node_modules/', 'lib', '/test/'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'babel-jest',
  },
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.json',
    },
  },
  testMatch: ['**/__tests__/*.+(ts|tsx|js)'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '^test/(.*)': '<rootDir>/test/$1.tsx',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  setupTestFrameworkScriptFile: require.resolve('./test/jest.setup.ts'),
  timers: 'fake',
  resetModules: true,
  resetMocks: true,
};
