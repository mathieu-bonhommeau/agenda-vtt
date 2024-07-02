import { Controller, Get, HttpCode } from '@nestjs/common'

@Controller('calendar-events')
export class CalendarEventController {
    @Get()
    @HttpCode(200)
    retrieveEvents() {
        return 'calendar events'
    }
}
