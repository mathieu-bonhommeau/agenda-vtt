import { Module } from '@nestjs/common'
import { PgTestingProvider } from './pg-testing.provider'

@Module({
    providers: [PgTestingProvider],
    exports: [PgTestingProvider],
})
export class PgTestingModule {}
