import { CalendarEvent } from '@/app/calendar-event/business/models/event'
import { LatLon } from '@/app/calendar-event/business/models/geolocation'
import { EventsGateway } from '@/app/calendar-event/business/ports/events.gateway'
import { RetrieveEventsCommand } from '@/app/calendar-event/business/use-case/retrieve-events/retrieve-events'

export class InMemoryEventsGateway implements EventsGateway {
    public events: CalendarEvent[] = []
    public error: boolean = false

    async retrieveEvents(command: RetrieveEventsCommand): Promise<CalendarEvent[]> {
        if (this.error) throw 'failed'
        if (command.startDate && command.endDate)
            this.events = this.events.filter((event) => {
                return (
                    new Date(command.startDate!) <= new Date(event.endDate) &&
                    new Date(command.endDate!) >= new Date(event.endDate)
                )
            })
        if (command.startDate)
            this.events = this.events.filter((event) => {
                return new Date(command.startDate!) <= new Date(event.endDate)
            })

        if (command.placeBbox)
            this.events = this.events.filter((event) => {
                return this.isPointInsideBoundingBox(event.eventLocation.latLon, command.placeBbox!)
            })

        return this.events
    }

    private isPointInsideBoundingBox(latLon: LatLon, boundingBox: number[]): boolean {
        const { lat, lon } = latLon
        console.log(lat, lon)
        const [minLat, minLon, maxLat, maxLon] = boundingBox
        console.log(minLat, minLon, maxLat, maxLon)

        console.log(lat >= minLat && lat <= maxLat && lon >= minLon && lon <= maxLon)

        return lat >= minLat && lat <= maxLat && lon >= minLon && lon <= maxLon
    }
}
