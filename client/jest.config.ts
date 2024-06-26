import type { Config } from 'jest'

const config: Config = {
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    testEnvironment: 'node',
    testTimeout: 20000,
    testRegex: '.*(.spec|.ispec).ts',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    roots: ['<rootDir>/src/'],
    modulePaths: ['<rootDir>'],
    setupFilesAfterEnv: ['jest-extended/all', 'jest-expect-message'],
    maxConcurrency: 10,
    maxWorkers: 5,
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
}

export default config
