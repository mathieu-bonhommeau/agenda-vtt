import type { Config } from 'jest'

const config: Config = {
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    testEnvironment: 'node',
    testTimeout: 30000,
    testRegex: '.*(.spec|.ispec|e2e-spec).ts',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    roots: ['<rootDir>/src/'],
    modulePaths: ['<rootDir>'],
    setupFilesAfterEnv: ['jest-extended/all', 'jest-expect-message'],
    maxConcurrency: 10,
    maxWorkers: parseInt(process.env.MAX_WORKERS || '5'),
}

export default config
