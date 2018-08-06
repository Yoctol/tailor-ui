module.exports = {
  coverageDirectory: './coverage/',
  transformIgnorePatterns: ['/node_modules/'],
  testPathIgnorePatterns: ['/node_modules/', 'lib', '/test/'],
  moduleNameMapper: {
    '^test/(.*)': '<rootDir>/test/$1.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  setupTestFrameworkScriptFile: '<rootDir>/test/configure-enzyme.js',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  timers: 'fake',
  resetModules: true,
  resetMocks: true,
};
