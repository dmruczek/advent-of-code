/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '.spec.ts',
  collectCoverage: true,
  coverageDirectory: '.coverage'
  
};