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
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  setupFilesAfterEnv: [require.resolve('./test/jest.setup.ts')],
  resetModules: true,
  resetMocks: true,
};
