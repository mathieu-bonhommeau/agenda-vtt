import { DataSource, DataSourceOptions } from 'typeorm'
import { CalendarEventEntity } from '../entities/calendar-event.entity'
import { EventOrganizerEntity } from '../entities/event-organizer.entity'
import { EventLocationEntity } from '../entities/event-location.entity'
import { TraceEntity } from '../entities/trace.entity'
import 'dotenv/config'

const entities = [CalendarEventEntity, EventOrganizerEntity, EventLocationEntity, TraceEntity]
console.log('in config', process.env.POSTGRES_HOST)
export const pgConfig: DataSourceOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'root',
    database: process.env.POSTGRESS_DB || 'utagawa-agenda-db',
    entities,
    migrations: ['dist/_common/db/pg/migrations/*.js'],
    synchronize: true,
}

export const Pg = new DataSource(pgConfig)
