import {
    CalendarEvent,
    EventLocation,
    EventOrganizer,
    GeoEventLocation,
    Price,
    Trace,
} from '@/app/calendar-event/business/model/event'

export class CalendarEventBuilder {
    private _id: string = 'randomId'
    private _title: string = 'my title'
    private _description?: string
    private _createdAt: string = new Date().toDateString()
    private _startDate: string = new Date().toDateString()
    private _endDate: string = new Date().toDateString()
    private _eventLocation?: EventLocation
    private _traces?: Trace[]
    private _prices?: Price[]
    private _equipments?: string[]
    private _organizer?: EventOrganizer

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
            equipments: this._equipments,
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
}

export class EventLocationBuilder {
    private _country: string = 'France'
    private _region: string = 'Nouvelle Aquitaine'
    private _department: string = 'Landes'
    private _city: string = 'Dax'
    private _zipCode: string = '40000'
    private _latLon: GeoEventLocation = { lon: 43.370312777615865, lat: -0.9990490074308079 }

    build(): EventLocation {
        return {
            country: this._country,
            region: this._region,
            department: this._department,
            city: this._city,
            zipCode: this._zipCode,
            latLon: this._latLon,
        }
    }

    setLatLon(latLon: GeoEventLocation): EventLocationBuilder {
        this._latLon = latLon
        return this
    }
}
