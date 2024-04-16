import { CalendarEvent, EventLocation, EventOrganizer, Price, Trace } from '@/app/calendar-event/business/model/event'

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
            EventLocation: this._eventLocation,
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
}
