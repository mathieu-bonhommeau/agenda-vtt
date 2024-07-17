import { config } from 'dotenv'
import { exit } from 'process'
import { DataSource } from 'typeorm'
import { TraceEntity } from '../db/pg/entities/trace.entity'
import { CalendarEventEntity } from '../db/pg/entities/calendar-event.entity'
import { EventOrganizerEntity } from '../db/pg/entities/event-organizer.entity'
import { EventLocationEntity } from '../db/pg/entities/event-location.entity'
import { DbCalendarEventsBuilders } from '../helpers/db-calendar-events.helpers'
import { eventsFixtures } from './fixtures'
import { pgConfig } from '../db/pg/_config/pg'

class Seeders {
    private _dbBuilder: DbCalendarEventsBuilders

    constructor(private readonly _sql: DataSource) {
        this._dbBuilder = new DbCalendarEventsBuilders(this._sql)
    }

    async seed() {
        eventsFixtures.map((e) =>
            this._dbBuilder
                .buildCalendarEvent(e)
                .withEventLocation(e.eventLocation)
                .withTraces(e.traces)
                .withOrganizer(e.organizer),
        )

        await this._dbBuilder.executePromises()
    }

    async clear() {
        await this._sql.createQueryBuilder().delete().from(TraceEntity).execute()
        await this._sql.createQueryBuilder().delete().from(CalendarEventEntity).execute()
        await this._sql.createQueryBuilder().delete().from(EventOrganizerEntity).execute()
        await this._sql.createQueryBuilder().delete().from(EventLocationEntity).execute()
    }
}

export const main = async () => {
    let exitCode = 0
    config()
    const sql = await new DataSource(pgConfig).initialize()

    try {
        const seeders = new Seeders(sql)
        await seeders.clear()
        await seeders.seed()

        console.log('Successfully seeded database !')
    } catch (e) {
        console.error(`Seed Db failed with error: ${e}`, { e })
        exitCode = 1
    } finally {
        await sql.destroy()
    }
    return exitCode
}

main().then((exitCode) => {
    exit(exitCode)
})
