import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Server } from 'http'

describe('Retrieve events', () => {
    let sut: SUT
    let app: INestApplication

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({}).compile()
        app = moduleRef.createNestApplication()
        await app.init()
    })

    beforeEach(() => {
        sut = new SUT(app)
    })

    it('retrieves all events', async () => {
        const response = await sut.retrieveCalendarEvents('/calendar-events')

        console.log(response)

        //expect(response).
    })
})

class SUT {
    private readonly _server: Server

    constructor(private readonly _app: INestApplication) {
        this._server = this._app.getHttpServer()
    }

    async retrieveCalendarEvents(path: string) {
        return request(this._server).get(path)
    }
}
