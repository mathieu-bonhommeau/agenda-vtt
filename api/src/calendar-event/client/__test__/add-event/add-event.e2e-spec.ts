import { INestApplication, ValidationPipe } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { PgTestingProvider } from '../../../../_common/db/pg/pg-testing.provider'
import { Test } from '@nestjs/testing'
import { AppModule } from '../../../../_common/app/app.module'
import { Server } from 'http'
import { TraceEntity } from '../../../../_common/db/pg/entities/trace.entity'
import { CalendarEventEntity } from '../../../../_common/db/pg/entities/calendar-event.entity'
import { EventOrganizerEntity } from '../../../../_common/db/pg/entities/event-organizer.entity'
import { EventLocationEntity } from '../../../../_common/db/pg/entities/event-location.entity'
import { NewCalendarEventCommand } from '../../../business/use-cases/add-event/add-events'
import { toCalendarEventFromNewCalendarEventCommand } from '../dtos/to-calendar-event-from-response-body-dto'
import request from 'supertest'
import { CalendarEvent, LatLon, Trace } from '../../../business/models/calendar.event'
import { PgCalendarEventFactory } from '../../../infrastructure/factories/pg-event-location.factory'
import { PgCalendarEventRepository } from '../../../infrastructure/pg-calendar-event-repository'

describe('Add a new calendar event test e2e', () => {
    let sut: SUT
    let app: INestApplication
    let pg: DataSource
    let postgresContainer: StartedPostgreSqlContainer
    const now: Date = new Date()
    const trace: Trace = {
        id: '07e46831-5247-45a0-bc6f-f5e075d963c9',
        distance: 10,
    }
    const newEvent: NewCalendarEventCommand = {
        id: '07e46831-5247-45a0-bc6f-f5e075d963c9',
        title: 'my title',
        description: 'my description',
        startDate: '2024-07-16',
        endDate: '2024-07-19',
        eventLocation: {
            id: '07e46831-5247-45a0-bc6f-f5e075d963c9',
            address: 'my address',
            city: 'my city',
            country: 'FR',
            latLon: { lat: 1, lon: 1 },
        },
        traces: [trace],
        price: ['25'],
        services: ['Parking'],
        organizer: {
            id: '07e46831-5247-45a0-bc6f-f5e075d963c9',
            name: 'my name',
            email: 'emai@email.com',
        },
    }

    jest.setTimeout(60000)

    beforeAll(async () => {
        postgresContainer = await new PostgreSqlContainer('postgis/postgis:12-3.0').start()

        pg = await PgTestingProvider.useFactory(postgresContainer.getConnectionUri())

        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider('SQL')
            .useValue(pg)
            .overrideProvider('CalendarEventRepository')
            .useValue(new PgCalendarEventRepository({ pg, now }))
            .compile()
        app = moduleRef.createNestApplication()
        app.useGlobalPipes(new ValidationPipe({ transform: true }))
        await app.init()
    })

    beforeEach(async () => {
        sut = new SUT({ app, pg })
        await sut.clear()
    })

    it('saves a basic new event', async () => {
        const res = await sut.addNewEvent('/calendar-events', newEvent)

        expect(res.statusCode).toEqual(201)
        expect((await sut.getEvents())[0]).toEqual(toCalendarEventFromNewCalendarEventCommand(now)(newEvent))
    })

    it('tries to save a new event with an invalid range of date', async () => {
        const response = await sut.addNewEvent('/calendar-events', {
            ...newEvent,
            startDate: '2024-07-20',
            endDate: '2024-07-19',
        })

        expect(response.statusCode).toEqual(400)
        expect(await sut.getEvents()).toEqual([])
    })

    it('saves a new event with startdate and endate identical', async () => {
        const response = await sut.addNewEvent('/calendar-events', {
            ...newEvent,
            startDate: '2024-07-20',
            endDate: '2024-07-20',
        })

        expect(response.statusCode).toEqual(201)
        expect((await sut.getEvents())[0]).toEqual(
            toCalendarEventFromNewCalendarEventCommand(now)({
                ...newEvent,
                startDate: '2024-07-20',
                endDate: '2024-07-20',
            }),
        )
    })

    it.each`
        latlon
        ${null}
        ${{ lat: 1, lon: null }}
        ${{ lat: null, lon: 1 }}
        ${{ lat: 91, lon: 91 }}
    `(
        'tries to save a new event with event location with invalid lat lon : $latlon',
        async ({ latLon }: { latLon: LatLon | null }) => {
            const response = await sut.addNewEvent('/calendar-events', {
                ...newEvent,
                eventLocation: {
                    ...newEvent.eventLocation,
                    latLon: latLon,
                },
            })

            expect(response.statusCode).toEqual(400)
            expect(await sut.getEvents()).toEqual([])
        },
    )

    it.each`
        traces
        ${[{ ...trace, distance: -10 }]}
        ${[{ ...trace, positiveElevation: -300 }]}
        ${[{ ...trace, traceColor: 'yellow' }]}
    `('tries to save a new event with invalid traces : $traces', async ({ traces }: { traces: Trace[] }) => {
        const response = await sut.addNewEvent('/calendar-events', {
            ...newEvent,
            traces,
        })

        expect(response.statusCode).toEqual(400)
        expect(await sut.getEvents()).toEqual([])
    })

    it('saves a new event with multiple traces', async () => {
        const response = await sut.addNewEvent('/calendar-events', {
            ...newEvent,
            traces: [trace, { ...trace, id: '07e46831-5247-45a0-bc6f-f5e075d963c8' }],
        })

        expect(response.statusCode).toEqual(201)
        expect((await sut.getEvents())[0]).toEqual(
            toCalendarEventFromNewCalendarEventCommand(now)({
                ...newEvent,
                traces: [trace, { ...trace, id: '07e46831-5247-45a0-bc6f-f5e075d963c8' }],
            }),
        )
    })
})

class SUT {
    private readonly _server: Server
    private readonly _pg: DataSource

    constructor({ app, pg }: { app: INestApplication; pg: DataSource }) {
        this._server = app.getHttpServer()
        this._pg = pg
    }

    async addNewEvent(path: string, newEvent: NewCalendarEventCommand) {
        return request(this._server).post(`${path}`).send(newEvent)
    }

    async getEvents(): Promise<CalendarEvent[]> {
        const events = await this._pg
            .createQueryBuilder(CalendarEventEntity, 'calendar_event_entity')
            .leftJoinAndSelect('calendar_event_entity.eventLocation', 'event_location_entity')
            .leftJoinAndSelect('calendar_event_entity.organizer', 'event_organizer_entity')
            .leftJoinAndSelect('calendar_event_entity.traces', 'trace_entity')
            .getMany()
        return events.map((event: CalendarEventEntity) => PgCalendarEventFactory.create(event))
    }

    async clear() {
        await this._pg.createQueryBuilder().delete().from(TraceEntity).execute()
        await this._pg.createQueryBuilder().delete().from(CalendarEventEntity).execute()
        await this._pg.createQueryBuilder().delete().from(EventOrganizerEntity).execute()
        await this._pg.createQueryBuilder().delete().from(EventLocationEntity).execute()
    }
}
