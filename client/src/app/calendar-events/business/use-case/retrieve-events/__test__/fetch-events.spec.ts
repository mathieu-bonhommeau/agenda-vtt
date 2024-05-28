import { ReduxStore, setupStore } from '@/app/_common/business/store/store'
import { CalendarEvent, EventOrganizer } from '@/app/calendar-events/business/models/event'
import { EventLocation } from '@/app/calendar-events/business/models/geolocation'
import {
    CalendarEventBuilder,
    EventLocationBuilder,
} from '@/app/calendar-events/business/use-case/retrieve-events/__test__/calendar-event-builder'
import { retrieveEvents } from '@/app/calendar-events/business/use-case/retrieve-events/retrieve-events'
import { InMemoryEventsGateway } from '@/app/calendar-events/infrastructure/in-memory-events.gateway'
import { PlaceType } from '@/app/filters-events/business/models/filter'
import { Trace } from '@/app/traces/business/models/trace'

describe('Fetch events', () => {
    let sut: SUT
    let events: CalendarEvent[] = []

    beforeEach(() => {
        sut = new SUT()
    })

    describe('Dispatch action for retrieve events', () => {
        it('retrieves calendar events', async () => {
            events = sut.buildDefaultEvents(4)
            sut.givenEvents(events)

            await sut.retrieveEvents({})

            expect(sut.events).toEqual(events)
        })

        it('retrieves nothing if events are not found', async () => {
            events = sut.buildDefaultEvents(0)
            sut.givenEvents(events)

            await sut.retrieveEvents({})

            expect(sut.events).toEqual([])
        })

        it('retrieves nothing if get events from api return an error', async () => {
            events = sut.buildDefaultEvents(4)
            sut.givenEvents(events)
            sut.setError()

            await sut.retrieveEvents({})

            expect(sut.events).toEqual([])
            expect(sut.error).toEqual('RETRIEVE_EVENTS_FAILED')
        })

        describe('filters events by date', () => {
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
            it('retrieves all events after a define date', async () => {
                sut.givenEvents(events)

                await sut.retrieveEvents({ startDate: new Date('2024-05-26').toDateString() })

                expect(sut.events).toEqual([events[1], events[2], events[3], events[4]])
            })

            it('retrieves events in a specific date range', async () => {
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
                            address: 'my address',
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
                            address: 'my address',
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
                            address: 'my address',
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
                            address: 'my address',
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
                            address: 'my address',
                            latLon: {
                                lat: 43.70946844046192,
                                lon: -1.0528505714706378,
                            },
                        },
                    }),
                ]
            })

            it('retrieves all events of a define place', async () => {
                sut.givenEvents(events)

                await sut.retrieveEvents({ placeBbox: [-1.1020338, 43.7297539, -1.0250954, 43.675449] })

                expect(sut.events).toEqual([events[1], events[4]])
            })

            it('retrieves nothing if no place matches with bounding box', async () => {
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
                        organizer: {
                            name: 'VTT enduro association',
                            email: '',
                        },
                    }),
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d42',
                        title: 'Enduro du Vercors',
                        organizer: {
                            name: 'orga 2',
                            email: '',
                        },
                    }),
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d43',
                        title: 'Les Crapauds 24 heures VTT',
                        organizer: {
                            name: 'orga 3',
                            email: '',
                        },
                    }),
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d44',
                        title: 'ValsVertaco bike',
                        organizer: {
                            name: 'not correspond',
                            email: '',
                        },
                    }),
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d45',
                        title: 'Oeno-balade en Beaujolais',
                        organizer: {
                            name: 'not correspond',
                            email: '',
                        },
                    }),
                ]
            })

            it('retrieves events corresponding with search word on event title', async () => {
                sut.givenEvents(events)
                await sut.retrieveEvents({ keyWord: 'Vals' })

                expect(sut.events).toEqual([events[0], events[3]])
            })

            it('retrieves events corresponding with search word on event organizer', async () => {
                sut.givenEvents(events)
                await sut.retrieveEvents({ keyWord: 'orga' })

                expect(sut.events).toEqual([events[1], events[2]])
            })

            it('returns nothing if the search word does not matched with any events', async () => {
                sut.givenEvents(events)
                await sut.retrieveEvents({ keyWord: 'yyyy' })

                expect(sut.events).toEqual([])
            })
        })

        describe('Filter events by traces distance', () => {
            beforeEach(async () => {
                sut = new SUT()
                events = events = [
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d41',
                        traces: [
                            {
                                id: 'c40b7367-cddf-46d8-a072-c1fa23b99ea1',
                                link: 'http://mytrace1.com',
                                distance: 40,
                            },
                            {
                                id: 'c40b7367-cddf-46d8-a072-c1fa23b99ea2',
                                link: 'http://mytrace2.com',
                                distance: 35,
                            },
                        ],
                    }),
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d42',
                        traces: [
                            {
                                id: 'c40b7367-cddf-46d8-a072-c1fa23b99ea3',
                                link: 'http://mytrace3.com',
                                distance: 15,
                            },
                            {
                                id: 'c40b7367-cddf-46d8-a072-c1fa23b99ea4',
                                link: 'http://mytrace4.com',
                                distance: 30,
                            },
                        ],
                    }),
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d43',
                        traces: [
                            {
                                id: 'c40b7367-cddf-46d8-a072-c1fa23b99ea5',
                                link: 'http://mytrace6.com',
                                distance: 70,
                            },
                        ],
                    }),
                ]
            })

            it('retrieves all events that contain traces less than a define distance', async () => {
                sut.givenEvents(events)
                await sut.retrieveEvents({ distanceMax: 40 })

                expect(sut.events).toEqual([events[0], events[1]])
            })

            it('retrieves all events that contain traces more than a define distance', async () => {
                sut.givenEvents(events)
                await sut.retrieveEvents({ distanceMin: 40 })

                expect(sut.events).toEqual([events[0], events[2]])
            })

            it('retrieves all events that contain traces with distances less than distanceMax and more than distanceMin', async () => {
                sut.givenEvents(events)
                await sut.retrieveEvents({ distanceMax: 34, distanceMin: 20 })

                expect(sut.events).toEqual([events[1]])
            })

            it('returns nothing if any events corresponds to the distance search', async () => {
                sut.givenEvents(events)
                await sut.retrieveEvents({ distanceMin: 200 })

                expect(sut.events).toEqual([])
            })
        })

        describe('sort events', () => {
            beforeEach(() => {
                events = [
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d41',
                        startDate: new Date('2024-05-15').toDateString(),
                        endDate: new Date('2024-05-17').toDateString(),
                        eventLocation: {
                            country: 'France',
                            department: 'Yvelines',
                            postcode: '77000',
                            city: 'Paris',
                            region: 'Ile de France',
                            address: 'my address',
                            latLon: {
                                lat: 48.857177778429715,
                                lon: 2.353314452137148,
                            },
                        },
                    }),
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d44',
                        startDate: new Date('2024-05-15').toDateString(),
                        endDate: new Date('2024-05-17').toDateString(),
                        eventLocation: {
                            country: 'France',
                            department: 'Gers',
                            postcode: '22254',
                            city: 'Tartas',
                            region: 'Nouvelle Aquitaine',
                            address: 'my address',
                            latLon: {
                                lat: 47.46885554586697,
                                lon: -0.5693751476331029,
                            },
                        },
                    }),
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d43',
                        startDate: new Date('2024-04-15').toDateString(),
                        endDate: new Date('2024-04-17').toDateString(),
                        eventLocation: {
                            country: 'France',
                            department: 'Yvelines',
                            postcode: '77000',
                            city: 'Neuilly',
                            region: 'Ile de France',
                            address: 'my address',
                            latLon: {
                                lat: 43.306615804116724,
                                lon: 5.379702329955738,
                            },
                        },
                    }),
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d45',
                        startDate: new Date('2024-05-15').toDateString(),
                        endDate: new Date('2024-05-17').toDateString(),
                        eventLocation: {
                            country: 'France',
                            department: 'Landes',
                            postcode: '40330',
                            city: 'Dax',
                            region: 'Nouvelle Aquitaine',
                            address: 'my address',
                            latLon: {
                                lat: 43.70946844046192,
                                lon: -1.0528505714706378,
                            },
                        },
                    }),
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d45',
                        startDate: new Date('2024-05-15').toDateString(),
                        endDate: new Date('2024-05-17').toDateString(),
                        eventLocation: {
                            country: 'Belgique',
                            department: 'Departement belge',
                            postcode: undefined,
                            city: 'Bruxelle',
                            region: 'Sud Belgique',
                            address: 'my address',
                            latLon: {
                                lat: 43.70946844046192,
                                lon: -1.0528505714706378,
                            },
                        },
                    }),
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d45',
                        startDate: new Date('2024-03-15').toDateString(),
                        endDate: new Date('2024-03-17').toDateString(),
                        eventLocation: {
                            country: 'France',
                            department: 'Landes',
                            postcode: '77000',
                            city: 'Dax',
                            region: 'Nouvelle Aquitaine',
                            address: 'my address',
                            latLon: {
                                lat: 43.70946844046192,
                                lon: -1.0528505714706378,
                            },
                        },
                    }),
                ]
            })

            it('initially sort the events by department and by date', async () => {
                sut.givenEvents(events)
                await sut.retrieveEvents({})
                console.log(sut.events)
                expect(sut.events).toEqual([events[1], events[3], events[5], events[2], events[0], events[4]])
            })

            it('sort the events by date and by department', async () => {
                sut.givenEvents(events)
                await sut.retrieveEvents({ sortBy: 'date' })

                expect(sut.events).toEqual([events[5], events[2], events[1], events[3], events[0], events[4]])
            })
        })
    })
})

class SUT {
    private _store: ReduxStore
    private _calendarEventBuilder: CalendarEventBuilder
    private readonly _eventsGateway: InMemoryEventsGateway
    private now = () => new Date('2024-05-12')

    constructor() {
        this._eventsGateway = new InMemoryEventsGateway(this.now)
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
        traces,
        organizer,
    }: {
        id: string
        startDate?: string
        endDate?: string
        eventLocation?: EventLocation
        title?: string
        traces?: Trace[]
        organizer?: EventOrganizer
    }) {
        const builder = new CalendarEventBuilder().setId(id)
        startDate && builder.setStartDate(startDate)
        endDate && builder.setEndDate(endDate)
        eventLocation &&
            builder.setEventLocation(
                new EventLocationBuilder()
                    .setCity(eventLocation.city)
                    .setPostCode(eventLocation.postcode)
                    .setCountry(eventLocation.country)
                    .setLatLon(eventLocation.latLon)
                    .build(),
            )
        title && builder.setTitle(title)
        traces && builder.setTraces(traces)
        organizer && builder.setOrganizer(organizer)
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
        distanceMax,
        distanceMin,
        sortBy,
    }: {
        startDate?: string
        endDate?: string
        placeBbox?: number[]
        keyWord?: string
        distanceMax?: number
        distanceMin?: number
        sortBy?: 'date' | 'location'
    }) {
        const place = placeBbox && {
            bbox: placeBbox,
            country: '',
            city: '',
            latLon: { lat: 0, lon: 0 },
            type: 'city' as PlaceType,
        }
        await this._store.dispatch(
            retrieveEvents({ filters: { startDate, endDate, place, keyWord, distanceMax, distanceMin, sortBy } }),
        )
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
