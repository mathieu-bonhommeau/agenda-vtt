import { Controller, Get, HttpCode, Inject } from '@nestjs/common'
import { CalendarEvent } from '../business/models/calendar.event'
import { RetrieveEvents } from '../business/use-cases/retrieve-events/retrieve.events'

@Controller('calendar-events')
export class CalendarEventController {
    constructor(@Inject('RetrieveEventsUseCase') private readonly _retrieveEvents: RetrieveEvents) {}

    @Get()
    @HttpCode(200)
    async retrieveEvents(): Promise<CalendarEvent[]> {
        return await this._retrieveEvents.retrieveEvents()
    }
}
