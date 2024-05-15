import { CalendarEvent } from '@/app/calendar-event/business/models/event'
import { LatLon } from '@/app/calendar-event/business/models/geolocation'
import { EventsGateway } from '@/app/calendar-event/business/ports/events.gateway'
import { RetrieveEventsCommand } from '@/app/calendar-event/business/use-case/retrieve-events/retrieve-events'

export class InMemoryEventsGateway implements EventsGateway {
    public events: CalendarEvent[] = []
    public error: boolean = false

    async retrieveEvents(command: RetrieveEventsCommand): Promise<CalendarEvent[]> {
        let filteredEvents = [...this.events]

        console.log(filteredEvents)

        if (this.error) throw 'failed'

        if (command.startDate && command.endDate)
            filteredEvents = this.events.filter((event) => {
                return (
                    new Date(command.startDate!) <= new Date(event.endDate) &&
                    new Date(command.endDate!) >= new Date(event.endDate)
                )
            })
        if (command.startDate)
            filteredEvents = this.events.filter((event) => {
                return new Date(command.startDate!) <= new Date(event.endDate)
            })

        if (command.place)
            filteredEvents = this.events.filter((event) => {
                return this.isPointInsideBoundingBox(event.eventLocation.latLon, command.place!.bbox)
            })

        return filteredEvents
    }

    private isPointInsideBoundingBox(latLon: LatLon, boundingBox: number[]): boolean {
        const { lat, lon } = latLon

        const lonLimits = [boundingBox[0], boundingBox[2]].sort((a, b) => a - b)
        const latLimits = [boundingBox[1], boundingBox[3]].sort((a, b) => a - b)

        const isInLonRange = lon >= lonLimits[0] && lon <= lonLimits[1]
        const isInLatRange = lat >= latLimits[0] && lat <= latLimits[1]

        return isInLonRange && isInLatRange
    }
}
