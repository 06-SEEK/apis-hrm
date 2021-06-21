module.exports = {
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: [
    'node_modules',
    'config',
    'app.js',
    'tests',
    'validations',
  ],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
};
