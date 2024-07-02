import { CalendarEventController } from '../client/calendar-event.controller'
import { Module } from '@nestjs/common'

@Module({
    controllers: [CalendarEventController],
})
export class CalendarEventModule {}
