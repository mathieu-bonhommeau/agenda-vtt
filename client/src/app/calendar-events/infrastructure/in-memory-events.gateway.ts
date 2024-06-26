import { CalendarEvent } from '@/app/calendar-events/business/models/event'
import { LatLon } from '@/app/calendar-events/business/models/geolocation'
import { EventsGateway } from '@/app/calendar-events/business/ports/events.gateway'
import { RetrieveEventsCommand } from '@/app/calendar-events/business/use-case/retrieve-events/retrieve-events'
import { InMemoryEventCreationRepository } from '@/app/calendar-events/infrastructure/in-memory-event-creation.repository'
import Fuse, { FuseResult } from 'fuse.js'

export class InMemoryEventsGateway implements EventsGateway {
    public events: CalendarEvent[] = []
    public error: boolean = false

    constructor(private readonly _eventCreationRepository: InMemoryEventCreationRepository) {}

    async retrieveEvents(command: RetrieveEventsCommand): Promise<CalendarEvent[]> {
        let filteredEvents = [...this.events, ...this._eventCreationRepository.eventsJustCreated]

        if (this.error) throw 'failed'

        if (command.filters.startDate && command.filters.endDate)
            filteredEvents = filteredEvents.filter((event) => {
                return (
                    new Date(command.filters.startDate!) <= new Date(event.endDate) &&
                    new Date(command.filters.endDate!) >= new Date(event.endDate)
                )
            })

        if (command.filters.startDate && !command.filters.endDate)
            filteredEvents = filteredEvents.filter((event) => {
                return new Date(command.filters.startDate!) <= new Date(event.endDate)
            })

        if (command.filters.place)
            filteredEvents = filteredEvents.filter((event) => {
                return this.isPointInsideBoundingBox(event.eventLocation.latLon, command.filters.place!.bbox)
            })

        if (command.filters.keyWord) {
            filteredEvents = this.searchByKeyWord(command.filters.keyWord!)
        }

        if (command.filters.distanceMax && !command.filters.distanceMin) {
            filteredEvents = filteredEvents.filter((event) => {
                return event.traces?.find((trace) => trace.distance <= command.filters.distanceMax!)
            })
        }

        if (command.filters.distanceMin && !command.filters.distanceMax) {
            filteredEvents = filteredEvents.filter((event) => {
                return event.traces?.find((trace) => trace.distance >= command.filters.distanceMin!)
            })
        }

        if (command.filters.distanceMin && command.filters.distanceMax) {
            filteredEvents = filteredEvents.filter((event) => {
                return event.traces?.find(
                    (trace) =>
                        trace.distance <= command.filters.distanceMax! &&
                        trace.distance >= command.filters.distanceMin!,
                )
            })
        }

        return this.sortEvents(filteredEvents, command.filters?.sortBy)
    }

    private sortEvents(events: CalendarEvent[], sortBy: 'date' | 'location' = 'location'): CalendarEvent[] {
        if (sortBy === 'date') {
            return events.sort((a, b) => {
                const dateA = new Date(a.startDate).getTime()
                const dateB = new Date(b.startDate).getTime()

                if (dateA !== dateB) {
                    return dateA - dateB
                } else {
                    const locationA = parseInt(a.eventLocation.postcode?.slice(0, 2) || '')
                    const locationB = parseInt(b.eventLocation.postcode?.slice(0, 2) || '')

                    return locationA - locationB
                }
            })
        }
        return events.sort((a, b) => {
            const locationA = parseInt(a.eventLocation.postcode?.slice(0, 2) || '')
            const locationB = parseInt(b.eventLocation.postcode?.slice(0, 2) || '')

            if (locationA !== locationB) {
                return locationA - locationB
            } else {
                const dateA = new Date(a.startDate).getTime()
                const dateB = new Date(b.startDate).getTime()
                return dateA - dateB
            }
        })
    }

    private isPointInsideBoundingBox(latLon: LatLon, boundingBox: number[]): boolean {
        const { lat, lon } = latLon

        const lonLimits = [boundingBox[0], boundingBox[2]].sort((a, b) => a - b)
        const latLimits = [boundingBox[1], boundingBox[3]].sort((a, b) => a - b)

        const isInLonRange = lon >= lonLimits[0] && lon <= lonLimits[1]
        const isInLatRange = lat >= latLimits[0] && lat <= latLimits[1]

        return isInLonRange && isInLatRange
    }

    private searchByKeyWord(search: string): CalendarEvent[] {
        const fuse = new Fuse(this.events, {
            isCaseSensitive: false,
            includeScore: true,
            keys: ['title', 'organizer.name'],
            threshold: 0.3,
        })

        return fuse.search(search).map((res: FuseResult<CalendarEvent>) => {
            return res.item
        })
    }
}
