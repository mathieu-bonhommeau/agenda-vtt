import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Server } from 'http'
import { CalendarEventController } from '../calendar-event.controller'
import {
    arbitraryCalendarEvent,
    arbitraryContact,
    arbitraryEventLocation,
    arbitraryEventOrganizer,
    arbitraryTrace,
} from '../../../_common/helpers/event-factories.helpers'
import { CalendarEvent } from '../../business/models/calendar.event'
import { v4 } from 'uuid'
import { CalendarEventEntity } from '../../../_common/db/pg/entities/calendar-event.entity'
import { DataSource } from 'typeorm'
import { EventLocationEntity } from '../../../_common/db/pg/entities/event-location.entity'
import { TraceEntity } from '../../../_common/db/pg/entities/trace.entity'
import { EventOrganizerEntity } from '../../../_common/db/pg/entities/event-organizer.entity'
import { calendarEventDataSourceProvider, retrieveEventsProvider } from '../../_config/calendar-event.module'
import { PgTestingProvider } from '../../../_common/db/pg/pg-testing.provider'
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { DbCalendarEventsBuilders } from '../../../_common/helpers/db-calendar-events.helpers'
import { toCalendarEventFromResponseBodyDto } from './to-calendar-event-from-response-body-dto'

describe('Calendar event e2e test', () => {
    let sut: SUT
    let app: INestApplication
    let pg: DataSource
    let postgresContainer: StartedPostgreSqlContainer
    const eventId1 = '6bf69ab6-9072-47e6-a320-3ebd30d510c1'
    const eventId2 = '6bf69ab6-9072-47e6-a320-3ebd30d510c2'
    const eventId3 = '6bf69ab6-9072-47e6-a320-3ebd30d510c3'
    const eventId4 = '6bf69ab6-9072-47e6-a320-3ebd30d510c4'

    jest.setTimeout(60000)

    const events = [
        arbitraryCalendarEvent({
            id: eventId1,
            startDate: new Date('2024-10-25'),
            endDate: new Date('2024-10-27'),
            eventLocation: arbitraryEventLocation({ id: v4() }),
            traces: [arbitraryTrace({ id: v4() }), arbitraryTrace({ id: v4() })],
            organizer: arbitraryEventOrganizer({
                id: v4(),
                contacts: [arbitraryContact({ name: 'dorianito' })],
            }),
        }),
        arbitraryCalendarEvent({
            id: eventId2,
            startDate: new Date('2024-11-25'),
            endDate: new Date('2024-11-27'),
            eventLocation: arbitraryEventLocation({
                id: v4(),
                housenumber: null,
                county: null,
                postcode: null,
            }),
            traces: [arbitraryTrace({ id: v4() }), arbitraryTrace({ id: v4() })],
            organizer: arbitraryEventOrganizer({
                id: v4(),
                contacts: [arbitraryContact({ name: 'marcito' })],
            }),
        }),
        arbitraryCalendarEvent({
            id: eventId3,
            startDate: new Date('2024-11-01'),
            endDate: new Date('2024-11-03'),
            eventLocation: arbitraryEventLocation({ id: v4() }),
            traces: [arbitraryTrace({ id: v4() }), arbitraryTrace({ id: v4() })],
            organizer: arbitraryEventOrganizer({
                id: v4(),
                contacts: [arbitraryContact({ name: 'dorianito' })],
            }),
        }),
        arbitraryCalendarEvent({
            id: eventId4,
            startDate: new Date('2024-10-11'),
            endDate: new Date('2024-10-12'),
            eventLocation: arbitraryEventLocation({ id: v4() }),
            traces: [arbitraryTrace({ id: v4() }), arbitraryTrace({ id: v4() })],
            organizer: arbitraryEventOrganizer({
                id: v4(),
                contacts: [arbitraryContact({ name: 'dorianito' })],
            }),
        }),
    ]

    beforeAll(async () => {
        postgresContainer = await new PostgreSqlContainer('postgis/postgis:12-3.0').start()
        pg = await PgTestingProvider.useFactory(postgresContainer.getConnectionUri())

        const moduleRef = await Test.createTestingModule({
            controllers: [CalendarEventController],
            providers: [
                retrieveEventsProvider,
                calendarEventDataSourceProvider,
                {
                    provide: 'SQL',
                    useValue: pg,
                },
            ],
        }).compile()
        app = moduleRef.createNestApplication()
        await app.init()
    })

    beforeEach(async () => {
        sut = new SUT({ app, pg })
        await sut.clear()

        events.forEach((event) => {
            sut.givenCalendarEvent(event)
                .withTraces(event.traces)
                .withEventLocation(event.eventLocation)
                .withOrganizer(event.organizer)
        })

        await sut.executePromises()
    })

    afterAll(async () => {
        await pg.destroy()
        await postgresContainer.stop()
    })

    it('retrieves all events', async () => {
        const response = await sut.retrieveCalendarEvents('/calendar-events', {})

        expect(response.status).toEqual(200)
        expect(response.body.length).toEqual(4)

        events.forEach((event, i) => {
            expect(toCalendarEventFromResponseBodyDto(response.body[i])).toEqual(event)
        })
    })

    it.each`
        dateToCompare   | resultsIds
        ${'2024-10-31'} | ${[eventId2, eventId3]}
        ${'2024-11-01'} | ${[eventId2, eventId3]}
        ${'2024-11-02'} | ${[eventId2, eventId3]}
        ${'2024-11-03'} | ${[eventId2, eventId3]}
        ${'2024-11-04'} | ${[eventId2]}
    `(
        'retrieves only events scheduled after or equal a this date $dateToCompare',
        async ({ dateToCompare, resultsIds }: { dateToCompare: string; resultsIds: string[] }) => {
            const response = await sut.retrieveCalendarEvents('/calendar-events', {
                start: new Date(dateToCompare),
            })
            expect(response.status).toEqual(200)

            expect(response.body.map((e: unknown) => e['id'])).toEqual(resultsIds)
        },
    )

    it.each`
        startDateToCompare | endDateToCompare | resultsIds
        ${'2024-10-31'}    | ${'2024-11-04'}  | ${[eventId3]}
        ${'2024-11-01'}    | ${'2024-11-03'}  | ${[eventId3]}
        ${'2024-11-02'}    | ${'2024-11-25'}  | ${[eventId2, eventId3]}
        ${'2024-11-03'}    | ${'2024-11-27'}  | ${[eventId2, eventId3]}
    `(
        'retrieves only events scheduled after or equal a this start date $startDateToCompare and before or equal this end date $endDateToCompare',
        async ({
            startDateToCompare,
            endDateToCompare,
            resultsIds,
        }: {
            startDateToCompare: string
            endDateToCompare: string
            resultsIds: string[]
        }) => {
            const response = await sut.retrieveCalendarEvents('/calendar-events', {
                start: new Date(startDateToCompare),
                end: new Date(endDateToCompare),
            })
            expect(response.status).toEqual(200)

            expect(response.body.map((e: unknown) => e['id'])).toEqual(resultsIds)
        },
    )
})

class SUT {
    private readonly _server: Server
    private readonly _pg: DataSource
    private readonly _testBuilder: DbCalendarEventsBuilders

    constructor({ app, pg }: { app: INestApplication; pg: DataSource }) {
        this._server = app.getHttpServer()
        this._pg = pg
        this._testBuilder = new DbCalendarEventsBuilders(this._pg)
    }

    givenCalendarEvent(event: CalendarEvent) {
        return this._testBuilder.buildCalendarEvent(event)
    }

    async retrieveCalendarEvents(path: string, query: { start?: Date; end?: Date }) {
        let queriesString = ''

        if (query.start) queriesString += `&start=${query.start}`
        if (query.end) queriesString += `&end=${query.end}`

        return request(this._server).get(`${path}?${queriesString}`)
    }

    async executePromises() {
        await this._testBuilder.executePromises()
    }

    async clear() {
        await this._pg.createQueryBuilder().delete().from(TraceEntity).execute()
        await this._pg.createQueryBuilder().delete().from(CalendarEventEntity).execute()
        await this._pg.createQueryBuilder().delete().from(EventOrganizerEntity).execute()
        await this._pg.createQueryBuilder().delete().from(EventLocationEntity).execute()
    }
}
