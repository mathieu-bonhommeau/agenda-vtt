import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CalendarEventModule } from '../../calendar-event/_config/calendar-event.module'

@Module({
    imports: [ConfigModule.forRoot(), CalendarEventModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
