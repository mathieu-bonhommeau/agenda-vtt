import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { CalendarEventModule } from '../../calendar-event/_config/calendar-event.module'

@Module({
    imports: [ConfigModule.forRoot(), CalendarEventModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
