import { Module } from '@nestjs/common'
import { PgProvider } from './pg.provider'

@Module({
    providers: [PgProvider],
    exports: [PgProvider],
})
export class PgModule {}
