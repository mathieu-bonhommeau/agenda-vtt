import { CalendarEventController } from '../client/calendar-event.controller'
import { Module } from '@nestjs/common'
import { PgModule } from '../../_common/db/pg/pg.module'
import { RetrieveEvents } from '../business/use-cases/retrieve-events/retrieve.events'
import { DataSource } from 'typeorm'

export const CalendarEventDataSourceProvider = {
    provide: 'CalendarEventDataSource',
    useFactory: (pg: DataSource) => new PgCalendarEventDataSource(pg),
}

export const RetrieveEventsProvider = {
    provide: 'RetrieveEventsUseCase',
    useFactory: CalendarEvent,
}

@Module({
    imports: [PgModule],
    controllers: [CalendarEventController],
})
export class CalendarEventModule {}
