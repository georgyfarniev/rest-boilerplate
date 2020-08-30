module.exports = {
  testEnvironment: 'node',
  testMatch: [
    '**/tests/**/*.spec.ts'
  ],
  preset: '@shelf/jest-mongodb',
  transformIgnorePatterns: ['^.+\\.js$'],
  silent: true
}
