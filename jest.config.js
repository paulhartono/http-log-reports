module.exports = {
  testEnvironment: 'node',

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  testMatch: ['<rootDir>/src/**/*.(test|spec).(js|ts)', '<rootDir>/test/**/*.(test|spec).(js|ts)'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  preset: 'ts-jest',
}
