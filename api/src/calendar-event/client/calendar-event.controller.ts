import { Controller, Get, HttpCode, Inject, Query } from '@nestjs/common'
import { CalendarEvent } from '../business/models/calendar.event'
import { RetrieveEvents } from '../business/use-cases/retrieve-events/retrieve.events'
import { ArrayMaxSize, IsArray, IsDateString, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RetrieveEventsQuery {
    @ApiProperty({ example: '2024-07-16T06:56:15.151' })
    @IsDateString()
    @IsOptional()
    start?: string

    @ApiProperty({ example: '2024-07-16T06:56:15.151' })
    @IsDateString()
    @IsOptional()
    end?: string

    @ApiProperty({ example: ['2.25', '45.63', '2.36', '48.88'] })
    @ArrayMaxSize(4)
    @IsOptional()
    bbox?: string[]
}

@Controller('calendar-events')
export class CalendarEventController {
    constructor(@Inject('RetrieveEventsUseCase') private readonly _retrieveEvents: RetrieveEvents) {}

    @Get()
    @HttpCode(200)
    async retrieveEvents(@Query() query: RetrieveEventsQuery): Promise<CalendarEvent[] | void> {
        return await this._retrieveEvents.retrieveEvents({
            start: query.start && new Date(query.start),
            end: query.end && new Date(query.end),
            bbox: query.bbox && query.bbox,
        })
    }
}
