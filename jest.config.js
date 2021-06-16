module.exports = {
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: ['node_modules', 'config', 'app.js', '__tests__'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
};
