import { PgTesting } from './_config/pg-testing'

export const PgTestingProvider = {
    provide: 'SQL',
    useFactory: async (testContainerUri: string) => {
        return PgTesting(testContainerUri).initialize()
    },
}
