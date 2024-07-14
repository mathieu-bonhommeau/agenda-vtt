import { CalendarEventController } from '../client/calendar-event.controller'
import { Module } from '@nestjs/common'
import { PgModule } from '../../_common/db/pg/pg.module'
import { DataSource } from 'typeorm'
import { RetrieveEvents } from '../business/use-cases/retrieve-events/retrieve.events'
import { CalendarEventDataSource } from '../business/ports/calendar-event-data.source'
import { PgCalendarEventDataSource } from '../infrastructure/pg-calendar-event.datasource'

export const calendarEventDataSourceProvider = {
    provide: 'CalendarEventDataSource',
    useFactory: (pg: DataSource) => new PgCalendarEventDataSource({ pg }),
    inject: ['SQL'],
}

export const retrieveEventsProvider = {
    provide: 'RetrieveEventsUseCase',
    useFactory: (calendarEventDataSource: CalendarEventDataSource) => new RetrieveEvents({ calendarEventDataSource }),
    inject: ['CalendarEventDataSource'],
}

@Module({
    imports: [PgModule],
    controllers: [CalendarEventController],
    providers: [retrieveEventsProvider, calendarEventDataSourceProvider],
})
export class CalendarEventModule {}
