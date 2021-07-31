require('jest-preset-angular/ngcc-jest-processor');
module.exports = {
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/app/core/$1',
    '@shared/(.*)': '<rootDir>/app/shared/$1',
  },
  testPathIgnorePatterns: ["<rootDir>/cypress/"],
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['./setup-jest.ts'],
  collectCoverage: true,
  coverageReporters: ['json', 'html', 'text'],
  coverageDirectory: '../coverage/',
  collectCoverageFrom: ['**/*.ts'],
};