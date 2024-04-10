export type Event = {
    id: string
    title: string
    description: string
    startDate: Date
    endDate: Date
    localisation: Localisation
    //trace: Array<GpxData>
}

export type Localisation = {
    country: string
    region: string
    department: string
    city: string
    zipCode: string
    latLon: LatLon
}

export type LatLon = {
    lat: number
    lon: number
}
