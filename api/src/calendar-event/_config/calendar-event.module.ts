import { CalendarEventController } from '../client/calendar-event.controller'
import { Module } from '@nestjs/common'
import { PgModule } from '../../_common/db/pg/pg.module'
import { DataSource } from 'typeorm'
import { RetrieveEvents } from '../business/use-cases/retrieve-events/retrieve.events'
import { CalendarEventDataSource } from '../business/ports/calendar-event-data.source'
import { PgCalendarEventDataSource } from '../infrastructure/pg-calendar-event.datasource'
import { CalendarEventRepository } from '../business/ports/calendar-event.repository'
import { AddCalendarEvent } from '../business/use-cases/add-event/add-events'
import { PgCalendarEventRepository } from '../infrastructure/pg-calendar-event-repository'

export const calendarEventDataSourceProvider = {
    provide: 'CalendarEventDataSource',
    useFactory: (pg: DataSource) => new PgCalendarEventDataSource({ pg }),
    inject: ['SQL'],
}

export const calendarEventRepositoryProvider = {
    provide: 'CalendarEventRepository',
    useFactory: (pg: DataSource) => new PgCalendarEventRepository({ pg, now: new Date() }),
    inject: ['SQL'],
}

export const retrieveEventsProvider = {
    provide: 'RetrieveEventsUseCase',
    useFactory: (calendarEventDataSource: CalendarEventDataSource) => new RetrieveEvents({ calendarEventDataSource }),
    inject: ['CalendarEventDataSource'],
}

export const addEventProvider = {
    provide: 'AddEventUseCase',
    useFactory: (calendarEventRepository: CalendarEventRepository) => new AddCalendarEvent({ calendarEventRepository }),
    inject: ['CalendarEventRepository'],
}

@Module({
    imports: [PgModule],
    controllers: [CalendarEventController],
    providers: [
        retrieveEventsProvider,
        calendarEventDataSourceProvider,
        addEventProvider,
        calendarEventRepositoryProvider,
    ],
})
export class CalendarEventModule {}
