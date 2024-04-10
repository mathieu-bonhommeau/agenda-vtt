export type CalendarEvent = {
    id: string
    title: string
    description: string
    createdAt: Date
    startDate: Date
    endDate: Date
    location: Location
    traces: Trace[]
    price: Price[]
    equipments: string[] //equipements obligatoire comme casque ou certification medical
    organizer: EventOrganizer
}

export type Location = {
    country: string
    region: string
    department: string
    city: string
    zipCode: string
    latLon: Geolocation
}

export type Geolocation = {
    lat: number
    lon: number
}

export type BikeType = 'allMountainXc' | 'enduro' | 'dhGravity'
export type TraceLoop = 'all' | 'onlyLoop' | 'noLoop'

export type Trace = {
    bikeType: BikeType
    duration: number
    distance: number
    positiveElevation: number
    negativeElevation: number
    traceLoop: TraceLoop
    traceDifficulty: TraceDifficulty
}

export type TraceColor = 'green' | 'blue' | 'red' | 'black'

export type TraceDifficulty = {
    //trace: GpxData
    traceColor: TraceColor
    technicalDifficulty: number //de 1 à 6
    physicalDifficulty: number // de 1 à 6
    pushingCarrying: number // de 1 à 6
}

export type CustomerType = 'all' | 'licensee' | 'noLicensee'

export type Price = {
    customerType: CustomerType
}

export type EventOrganizer = {
    name: string
    email: string
    phone: string
}
