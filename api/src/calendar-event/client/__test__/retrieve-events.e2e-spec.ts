import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Server } from 'http'
import { CalendarEventController } from '../calendar-event.controller'
import { arbitraryCalendarEvent } from '../../../_common/helpers/event-factories.helpers'
import { CalendarEvent } from '../../business/models/calendar.event'
import { v4 } from 'uuid'

describe('Calendar event e2e test', () => {
    let sut: SUT
    let app: INestApplication

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [CalendarEventController],
        }).compile()
        app = moduleRef.createNestApplication()
        await app.init()
    })

    beforeEach(() => {
        sut = new SUT(app)
        sut.givenCalendarEvents([arbitraryCalendarEvent({ id: v4() })])
    })

    it('retrieves all events', async () => {
        const response = await sut.retrieveCalendarEvents('/calendar-events')

        expect(response.status).toEqual(200)
        expect(response.body).toEqual({})
    })
})

class SUT {
    private readonly _server: Server

    constructor(private readonly _app: INestApplication) {
        this._server = this._app.getHttpServer()
    }

    async givenCalendarEvents(events: CalendarEvent[]): Promise<void> {}

    async retrieveCalendarEvents(path: string) {
        return request(this._server).get(path)
    }
}
