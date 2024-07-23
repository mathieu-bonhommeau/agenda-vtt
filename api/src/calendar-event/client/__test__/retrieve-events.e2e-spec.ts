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
import { AppModule } from '../../../_common/app/app.module'

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
            title: 'valop',
            eventLocation: arbitraryEventLocation({ id: v4(), latLon: { lon: 2.49, lat: 48.88 }, postcode: '16321' }),
            traces: [arbitraryTrace({ id: v4(), distance: 20 }), arbitraryTrace({ id: v4(), distance: 10 })],
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
                postcode: '75600',
                latLon: { lon: 5, lat: 48.52 },
            }),
            traces: [arbitraryTrace({ id: v4(), distance: 45 }), arbitraryTrace({ id: v4(), distance: 15 })],
            organizer: arbitraryEventOrganizer({
                id: v4(),
                contacts: [arbitraryContact({ name: 'marcito' })],
            }),
        }),
        arbitraryCalendarEvent({
            id: eventId3,
            title: 'valopetsre',
            startDate: new Date('2024-11-01'),
            endDate: new Date('2024-11-03'),
            eventLocation: arbitraryEventLocation({ id: v4(), latLon: { lon: 2.1, lat: 47.7 }, postcode: '45000' }),
            traces: [arbitraryTrace({ id: v4(), distance: 28 }), arbitraryTrace({ id: v4(), distance: 50 })],
            organizer: arbitraryEventOrganizer({
                id: v4(),
                contacts: [arbitraryContact({ name: 'dorianito' })],
            }),
        }),
        arbitraryCalendarEvent({
            id: eventId4,
            startDate: new Date('2024-10-11'),
            endDate: new Date('2024-10-12'),
            eventLocation: arbitraryEventLocation({ id: v4(), latLon: { lon: 2.36, lat: 48.84 }, postcode: '25300' }),
            traces: [arbitraryTrace({ id: v4(), distance: 25 }), arbitraryTrace({ id: v4(), distance: 10 })],
            organizer: arbitraryEventOrganizer({
                id: v4(),
                name: 'Valontin',
                contacts: [arbitraryContact({ name: 'dorianito' })],
            }),
        }),
    ]

    beforeAll(async () => {
        postgresContainer = await new PostgreSqlContainer('postgis/postgis:12-3.0').start()
        pg = await PgTestingProvider.useFactory(postgresContainer.getConnectionUri())

        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
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
        try {
            const response = await sut.retrieveCalendarEvents('/calendar-events', {})
            expect(response.status).toEqual(200)
            expect(response.body.length).toEqual(4)

            events.forEach((event, i) => {
                expect(toCalendarEventFromResponseBodyDto(response.body[i])).toEqual(event)
            })
        } catch (e) {
            console.log('Error retrieving events:', e)
            throw e
        }
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
        ${'2024-11-02'}    | ${'2024-11-02'}  | ${[eventId3]}
        ${'2024-11-02'}    | ${'2024-11-25'}  | ${[eventId2, eventId3]}
        ${'2024-11-02'}    | ${'2024-11-26'}  | ${[eventId2, eventId3]}
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

    it('retrieves only events located in the bbox location with a deterministic radius', async () => {
        const response = await sut.retrieveCalendarEvents('/calendar-events', {
            bbox: [2.03, 48.69, 2.63, 49.01],
        })
        expect(response.status).toEqual(200)

        expect(response.body.map((e: unknown) => e['id'])).toEqual([eventId1, eventId4])
    })

    it.each`
        keyWord    | resultsIds
        ${'valo'}  | ${[eventId1, eventId3, eventId4]}
        ${'Valop'} | ${[eventId1, eventId3]}
        ${'alon'}  | ${[eventId4]}
    `(
        'retrieves only events whose title or organizer matches with the search word: $keyWord',
        async ({ keyWord, resultsIds }: { keyWord: string; resultsIds: string[] }) => {
            const response = await sut.retrieveCalendarEvents('/calendar-events', {
                keyWord,
            })
            expect(response.status).toEqual(200)

            expect(response.body.map((e: unknown) => e['id'])).toEqual(resultsIds)
        },
    )

    it('retrieves only events with a distance smaller than the define max distance', async () => {
        const response = await sut.retrieveCalendarEvents('/calendar-events', {
            distanceMax: 15,
        })
        expect(response.status).toEqual(200)

        expect(response.body.map((e: unknown) => e['id'])).toEqual([eventId1, eventId4])
    })

    it('retrieves only events with a distance greater than the define min distance', async () => {
        const response = await sut.retrieveCalendarEvents('/calendar-events', {
            distanceMin: 42,
        })
        expect(response.status).toEqual(200)

        expect(response.body.map((e: unknown) => e['id'])).toEqual([eventId2, eventId3])
    })

    it('retrieves only events with a distance greater than the define min distance and smaller than the define max distance', async () => {
        const response = await sut.retrieveCalendarEvents('/calendar-events', {
            distanceMin: 25,
            distanceMax: 35,
        })
        expect(response.status).toEqual(200)

        expect(response.body.map((e: unknown) => e['id'])).toEqual([eventId3, eventId4])
    })

    it.each`
        sortBy        | resultsIds
        ${'date'}     | ${[eventId4, eventId1, eventId3, eventId2]}
        ${'location'} | ${[eventId1, eventId4, eventId3, eventId2]}
    `(
        'retrieves events sorted by $sortBy',
        async ({ sortBy, resultsIds }: { sortBy: string; resultsIds: string[] }) => {
            const response = await sut.retrieveCalendarEvents('/calendar-events', {
                sortBy,
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

    async retrieveCalendarEvents(
        path: string,
        query: {
            start?: Date
            end?: Date
            bbox?: number[]
            keyWord?: string
            distanceMax?: number
            distanceMin?: number
            sortBy?: string
        },
    ) {
        let queriesString = ''

        if (query.start) queriesString += `&start=${query.start}`
        if (query.end) queriesString += `&end=${query.end}`
        if (query.bbox) {
            const bboxString = `${query.bbox[0]},${query.bbox[1]},${query.bbox[2]},${query.bbox[3]}`
            queriesString += `&bbox=${bboxString}`
        }
        if (query.keyWord) queriesString += `&keyWord=${query.keyWord}`
        if (query.distanceMax) queriesString += `&distanceMax=${query.distanceMax}`
        if (query.distanceMin) queriesString += `&distanceMin=${query.distanceMin}`
        if (query.sortBy) queriesString += `&sortBy=${query.sortBy}`

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
