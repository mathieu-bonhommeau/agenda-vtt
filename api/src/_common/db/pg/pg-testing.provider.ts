import { PgTesting } from './_config/pg-testing'

export const PgTestingProvider = {
    provide: 'SQL',
    useFactory: async () => {
        return PgTesting.initialize()
    },
}