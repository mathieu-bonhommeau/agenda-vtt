import { BadRequestException, Body, Controller, Get, HttpCode, Inject, Post, Query } from '@nestjs/common'
import { CalendarEvent } from '../business/models/calendar.event'
import { RetrieveEvents } from '../business/use-cases/retrieve-events/retrieve.events'
import { RetrieveEventsQuery } from './retrieve-events.query'
import { AddNewEventBody } from './add-new-event.body'
import { AddCalendarEvent } from '../business/use-cases/add-event/add-events'

@Controller('calendar-events')
export class CalendarEventController {
    constructor(
        @Inject('RetrieveEventsUseCase') private readonly _retrieveEvents: RetrieveEvents,
        @Inject('AddEventUseCase') private readonly _addEvents: AddCalendarEvent,
    ) {}

    @Get()
    @HttpCode(200)
    async retrieveEvents(@Query() query: RetrieveEventsQuery): Promise<CalendarEvent[] | void> {
        return await this._retrieveEvents.retrieveEvents({
            start: query.start && new Date(query.start),
            end: query.end && new Date(query.end),
            bbox: query.bbox && query.bbox.split(','),
            keyWord: query.keyWord,
            distanceMax: query.distanceMax && parseInt(query.distanceMax),
            distanceMin: query.distanceMin && parseInt(query.distanceMin),
            sortBy: query.sortBy && query.sortBy,
        })
    }

    @Post()
    @HttpCode(201)
    async saveEvent(@Body() body: AddNewEventBody): Promise<void> {
        try {
            await this._addEvents.addNewEvent({
                id: body.id,
                title: body.title,
                description: body?.description,
                startDate: body.startDate,
                endDate: body.endDate,
                eventLocation: body.eventLocation,
                traces: body.traces,
                price: body?.price,
                services: body?.services,
                organizer: body.organizer,
            })
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
}
