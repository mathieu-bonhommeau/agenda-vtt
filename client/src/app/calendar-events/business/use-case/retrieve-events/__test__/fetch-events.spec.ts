import { ReduxStore, setupStore } from '@/app/_common/business/store/store'
import { CalendarEvent } from '@/app/calendar-events/business/models/event'
import { EventLocation } from '@/app/calendar-events/business/models/geolocation'
import {
    CalendarEventBuilder,
    EventLocationBuilder,
} from '@/app/calendar-events/business/use-case/retrieve-events/__test__/calendar-event-builder'
import { retrieveEvents } from '@/app/calendar-events/business/use-case/retrieve-events/retrieve-events'
import { InMemoryEventsGateway } from '@/app/calendar-events/infrastructure/in-memory-events.gateway'

describe('Fetch events', () => {
    let sut: SUT
    let events: CalendarEvent[] = []

    beforeEach(() => {
        sut = new SUT()
    })

    describe('Dispatch action for retrieve events', () => {
        it('retrieve calendar events', async () => {
            events = sut.buildDefaultEvents(4)
            sut.givenEvents(events)

            await sut.retrieveEvents({})

            expect(sut.events).toEqual(events)
        })

        it('retrieve nothing if events are not found', async () => {
            events = sut.buildDefaultEvents(0)
            sut.givenEvents(events)

            await sut.retrieveEvents({})

            expect(sut.events).toEqual([])
        })

        it('retrieve nothing if get events from api return an error', async () => {
            events = sut.buildDefaultEvents(4)
            sut.givenEvents(events)
            sut.setError()

            await sut.retrieveEvents({})

            expect(sut.events).toEqual([])
            expect(sut.error).toEqual('RETRIEVE_EVENTS_FAILED')
        })

        describe('filter events by date', () => {
            beforeEach(() => {
                events = [
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d41',
                        startDate: new Date('2024-05-15').toDateString(),
                        endDate: new Date('2024-05-17').toDateString(),
                    }),
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d42',
                        startDate: new Date('2024-05-25').toDateString(),
                        endDate: new Date('2024-05-27').toDateString(),
                    }),
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d43',
                        startDate: new Date('2024-06-07').toDateString(),
                        endDate: new Date('2024-06-07').toDateString(),
                    }),
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d44',
                        startDate: new Date('2024-06-02').toDateString(),
                        endDate: new Date('2024-06-04').toDateString(),
                    }),
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d45',
                        startDate: new Date('2024-06-14').toDateString(),
                        endDate: new Date('2024-06-16').toDateString(),
                    }),
                ]
            })
            it('retrieve all events after a define date', async () => {
                sut.givenEvents(events)

                await sut.retrieveEvents({ startDate: new Date('2024-05-26').toDateString() })

                expect(sut.events).toEqual([events[1], events[2], events[3], events[4]])
            })

            it('retrieve events in a specific date range', async () => {
                sut.givenEvents(events)

                await sut.retrieveEvents({
                    startDate: new Date('2024-05-16').toDateString(),
                    endDate: new Date('2024-06-14').toDateString(),
                })

                expect(sut.events).toEqual([events[0], events[1], events[2], events[3]])
            })
        })

        describe('Filter events by place', () => {
            beforeEach(() => {
                events = [
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d41',
                        eventLocation: {
                            country: 'France',
                            city: 'Paris',
                            postcode: '75000',
                            latLon: {
                                lat: 48.857177778429715,
                                lon: 2.353314452137148,
                            },
                        },
                    }),
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d42',
                        eventLocation: {
                            country: 'France',
                            city: 'Dax',
                            postcode: '40000',
                            latLon: {
                                lat: 43.71658659046892,
                                lon: -1.0491951154017876,
                            },
                        },
                    }),
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d43',
                        eventLocation: {
                            country: 'France',
                            city: 'Marseille',
                            postcode: '13000',
                            latLon: {
                                lat: 43.306615804116724,
                                lon: 5.379702329955738,
                            },
                        },
                    }),
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d44',
                        eventLocation: {
                            country: 'France',
                            city: 'Angers',
                            postcode: '35000',
                            latLon: {
                                lat: 47.46885554586697,
                                lon: -0.5693751476331029,
                            },
                        },
                    }),
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d45',
                        eventLocation: {
                            country: 'France',
                            city: 'Dax',
                            postcode: '40000',
                            latLon: {
                                lat: 43.70946844046192,
                                lon: -1.0528505714706378,
                            },
                        },
                    }),
                ]
            })

            it('retrieve all events of a define place', async () => {
                sut.givenEvents(events)

                await sut.retrieveEvents({ placeBbox: [-1.1020338, 43.7297539, -1.0250954, 43.675449] })

                expect(sut.events).toEqual([events[1], events[4]])
            })

            it('retrieve nothing if no place matches with bounding box', async () => {
                sut.givenEvents(events)

                await sut.retrieveEvents({ placeBbox: [-10, 43, -11, 44] })

                expect(sut.events).toEqual([])
            })
        })

        describe('Filter events by word', () => {
            beforeEach(async () => {
                sut = new SUT()
                events = events = [
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d41',
                        title: 'Valsloppet VTT',
                    }),
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d42',
                        title: 'Enduro du Vercors',
                    }),
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d43',
                        title: 'Les Crapauds 24 heures VTT',
                    }),
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d44',
                        title: 'ValsVertaco bike',
                    }),
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d45',
                        title: 'Oeno-balade en Beaujolais',
                    }),
                ]
            })

            it('retrieve events corresponding with search word', async () => {
                sut.givenEvents(events)

                await sut.retrieveEvents({ keyWord: 'Vals' })

                expect(sut.events).toEqual([events[0], events[3]])
            })
        })
    })
})

class SUT {
    private _store: ReduxStore
    private _calendarEventBuilder: CalendarEventBuilder
    private readonly _eventsGateway: InMemoryEventsGateway

    constructor() {
        this._eventsGateway = new InMemoryEventsGateway()
        this._calendarEventBuilder = new CalendarEventBuilder()
        this._store = setupStore({ eventsGateway: this._eventsGateway })
    }

    buildDefaultEvents(count: number) {
        const events: CalendarEvent[] = []
        while (count--) {
            events.push(this._calendarEventBuilder.build())
        }
        return events
    }

    buildEvent({
        id,
        startDate,
        endDate,
        eventLocation,
        title,
    }: {
        id: string
        startDate?: string
        endDate?: string
        eventLocation?: EventLocation
        title?: string
    }) {
        const builder = new CalendarEventBuilder().setId(id)
        startDate && builder.setStartDate(startDate)
        endDate && builder.setEndDate(endDate)
        eventLocation &&
            builder.setEventLocation(
                new EventLocationBuilder()
                    .setCity(eventLocation.city)
                    .setCountry(eventLocation.country)
                    .setLatLon(eventLocation.latLon)
                    .build(),
            )
        title && builder.setTitle(title)
        return builder.build()
    }

    givenEvents(events: CalendarEvent[]) {
        this._eventsGateway.events = events
    }

    async retrieveEvents({
        startDate,
        endDate,
        placeBbox,
        keyWord,
    }: {
        startDate?: string
        endDate?: string
        placeBbox?: number[]
        keyWord?: string
    }) {
        const place = placeBbox && {
            bbox: placeBbox,
            country: '',
            city: '',
            latLon: { lat: 0, lon: 0 },
        }
        await this._store.dispatch(retrieveEvents({ filters: { startDate, endDate, place, keyWord } }))
    }

    get events() {
        return this._store.getState().eventsState.events
    }

    get error() {
        return this._store.getState().eventsState.error
    }

    setError() {
        this._eventsGateway.error = true
    }
}
