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
    '@tailor-ui/hooks': '<rootDir>/packages/tailor-ui-hooks/src',
    '@tailor-ui/utils': '<rootDir>/packages/tailor-ui-utils/src',
    '@tailor-ui/formik': '<rootDir>/packages/tailor-ui-formik/src',
    '@tailor-ui/lab': '<rootDir>/packages/tailor-ui-lab/src',
    '@tailor-ui/theme': '<rootDir>/packages/tailor-ui-theme/src',
  },
  setupFilesAfterEnv: [require.resolve('./test/jest.setup.ts')],
  resetModules: true,
  resetMocks: true,
};
