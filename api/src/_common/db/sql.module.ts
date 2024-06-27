import { Module } from '@nestjs/common'
import { SqlProvider } from './sql.provider'

@Module({
    providers: [SqlProvider],
    exports: [SqlProvider],
})
export class SqlModule {}
