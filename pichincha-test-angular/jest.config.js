module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testPathIgnorePatterns: [
      "/node_modules/",
      "/dist/",
    ],
    globals: {
      'ts-jest': {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.html$',
      },
    },
    transform: {
      '^.+\\.(ts|js|html)$': 'ts-jest',
    },
    moduleNameMapper: {
      '@src/(.*)': '<rootDir>/src/$1',
    },
    transformIgnorePatterns: [
      'node_modules/(?!@ngrx)',
    ],
    snapshotSerializers: [
      'jest-preset-angular/build/serializers/no-ng-attributes',
      'jest-preset-angular/build/serializers/ng-snapshot',
      'jest-preset-angular/build/serializers/html-comment'
    ],
  };
  