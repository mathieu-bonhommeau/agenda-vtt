import { Module } from '@nestjs/common'
import { PgTesting } from './_config/pg-testing'

export const PgTestingProvider = {
    provide: 'SQL',
    useFactory: async () => {
        return PgTesting.initialize()
    },
}

@Module({
    providers: [PgTestingProvider],
    exports: [PgTestingProvider],
})
export class PgTestingModule {}
