import { CalendarEvent, EventOrganizer, EventPrice } from '@/app/calendar-events/business/models/event'
import { EventLocation, GeoEventLocation } from '@/app/calendar-events/business/models/geolocation'
import { Trace, TraceColor } from '@/app/traces/business/models/trace'

export class CalendarEventBuilder {
    private _id: string = 'randomId'
    private _title: string = 'my title'
    private _description?: string
    private _createdAt: string = new Date().toDateString()
    private _startDate: string = new Date().toDateString()
    private _endDate: string = new Date().toDateString()
    private _eventLocation: EventLocation = new EventLocationBuilder().build()
    private _traces: Trace[] = []
    private _prices?: EventPrice[]
    private _services?: string[]
    private _organizer: EventOrganizer = { name: '', email: '' }

    build(): CalendarEvent {
        return {
            id: this._id,
            title: this._title,
            description: this._description,
            createdAt: this._createdAt,
            startDate: this._startDate,
            endDate: this._endDate,
            eventLocation: this._eventLocation,
            traces: this._traces,
            price: this._prices,
            services: this._services,
            organizer: this._organizer,
        }
    }

    setId(id: string): CalendarEventBuilder {
        this._id = id
        return this
    }

    setTitle(title: string): CalendarEventBuilder {
        this._title = title
        return this
    }

    setDescription(description: string): CalendarEventBuilder {
        this._description = description
        return this
    }

    setEventLocation(eventLocation: EventLocation): CalendarEventBuilder {
        this._eventLocation = eventLocation
        return this
    }

    setStartDate(startDate: string) {
        this._startDate = startDate
        return this
    }

    setEndDate(endDate: string) {
        this._endDate = endDate
        return this
    }

    setTraces(traces: Trace[]): CalendarEventBuilder {
        this._traces = traces
        return this
    }

    setPrices(prices: EventPrice[]): CalendarEventBuilder {
        this._prices = prices
        return this
    }

    setOrganizer(organizer: EventOrganizer): CalendarEventBuilder {
        this._organizer = organizer
        return this
    }

    setServices(services: string[]): CalendarEventBuilder {
        this._services = services
        return this
    }
}

export class EventLocationBuilder {
    private _country: string = 'France'
    private _region: string = 'Nouvelle Aquitaine'
    private _department: string = 'Landes'
    private _city: string = 'Dax'
    private _postcode?: string
    private _latLon: GeoEventLocation = { lon: 43.370312777615865, lat: -0.9990490074308079 }
    private _address: string = '155 rue de la mairie'

    build(): EventLocation {
        return {
            country: this._country,
            region: this._region,
            department: this._department,
            city: this._city,
            postcode: this._postcode,
            latLon: this._latLon,
            address: this._address,
        }
    }

    setLatLon(latLon: GeoEventLocation): EventLocationBuilder {
        this._latLon = latLon
        return this
    }

    setCountry(country: string): EventLocationBuilder {
        this._country = country
        return this
    }

    setCity(city: string): EventLocationBuilder {
        this._city = city
        return this
    }

    setAddress(address: string): EventLocationBuilder {
        this._address = address
        return this
    }

    setRegion(region: string): EventLocationBuilder {
        this._region = region
        return this
    }

    setDepartment(department: string): EventLocationBuilder {
        this._department = department
        return this
    }

    setPostCode(postcode?: string): EventLocationBuilder {
        this._postcode = postcode
        return this
    }
}

export class TraceBuilder {
    private _id: string = 'cd7f541a-f111-470a-b2e3-6b2e095b1ccd'
    private _utagawaId?: number
    private _link: string = 'http://utagawavtt.com/trace'
    private _distance: number = 30
    private _positiveElevation?: number
    private _traceColor?: TraceColor

    build(): Trace {
        return {
            id: this._id,
            utagawaId: this._utagawaId,
            link: this._link,
            distance: this._distance,
            positiveElevation: this._positiveElevation,
            traceColor: this._traceColor,
        }
    }

    setId(id: string): TraceBuilder {
        this._id = id
        return this
    }

    setUtagawaId(utagawaId: number): TraceBuilder {
        this._utagawaId = utagawaId
        return this
    }

    setLink(link: string): TraceBuilder {
        this._link = link
        return this
    }

    setDistance(distance: number): TraceBuilder {
        this._distance = distance
        return this
    }

    setPositiveElevation(positiveElevation: number): TraceBuilder {
        this._positiveElevation = positiveElevation
        return this
    }

    setTraceColor(traceColor: TraceColor): TraceBuilder {
        this._traceColor = traceColor
        return this
    }
}
