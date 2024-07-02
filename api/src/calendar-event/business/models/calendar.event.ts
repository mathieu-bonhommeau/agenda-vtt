export type EventLocation = {
    id: string
    country: string
    region?: string
    county?: string
    city: string
    postcode?: string
    housenumber?: string
    address: string
    latLon: LatLon
}
export type LatLon = {
    lat: number
    lon: number
}
export type Trace = {
    id: string
    utagawaId?: number
    link?: string
    distance: number
    positiveElevation?: number
    traceColor?: TraceColor | 'notDefined'
}
export type TraceColor = 'green' | 'blue' | 'red' | 'black'
export type EventPrice = {
    id: string
    price: string
}
export type EventOrganizer = {
    id: string
    name: string
    email: string
    website?: string
    contacts?: Contact[]
}
export type Contact = {
    id: string
    name: string
    phone: string
}
export type CalendarEvent = {
    id: string
    title: string
    description: string
    createdAt: Date
    startDate: Date
    endDate: Date
    eventLocation: EventLocation
    traces: Trace[]
    prices?: EventPrice[]
    services?: string[]
    organizer: EventOrganizer
}
