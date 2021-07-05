'use strict';

const CI = !!process.env.CI;

module.exports = {
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'reports/coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/file-mock.js',
  },
  reporters: [
    'default',
    CI && [
      'jest-junit',
      {
        ancestorSeparator: ' › ',
        classNameTemplate: '{classname}',
        includeConsoleOutput: true,
        outputDirectory: 'reports/junit',
        outputName: `jest${
          process.env.BUILDKITE_JOB_ID ? `+${process.env.BUILDKITE_JOB_ID}` : ''
        }.xml`,
        suiteName: 'Unit Tests',
        titleTemplate: '{title}',
      },
    ],
  ].filter(Boolean),
  setupFilesAfterEnv: ['<rootDir>/jest.d/setup-files-after-env/faker.ts'],
  testEnvironment: 'jsdom',
  testMatch: [
    '**/src/**/__tests__/**/*.[jt]s?(x)',
    '**/src/**/?(*.)+(spec|test).[tj]s?(x)',
  ],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.stories\\.[tj]sx?$': '@storybook/addon-storyshots/injectFileName',
    // babel-jest is loaded automatically when transform is null
    // eslint-disable-next-line sort-keys
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
};
