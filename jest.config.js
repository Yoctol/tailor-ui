module.exports = {
  rootDir: __dirname,
  coverageDirectory: './coverage/',
  transformIgnorePatterns: ['/node_modules/'],
  testPathIgnorePatterns: ['/node_modules/', 'lib', '/test/'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)?$': 'babel-jest',
  },
  testMatch: ['**/__tests__/*.+(ts|tsx|js)'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '^test/(.*)': '<rootDir>/test/$1.tsx',
  },
  setupFilesAfterEnv: [require.resolve('./test/jest.setup.ts')],
  resetModules: true,
  resetMocks: true,
};
