export const placeZoom = {
    country: 6,
    state: 8,
    county: 9,
    city: 11,
    street: 11,
    house: 11,
}

export function validateLatLon(input: string): boolean {
    const regex = /^-?\d+(\.\d+)?\s*[,\s]\s*-?\d+(\.\d+)?$/
    return regex.test(input)
}
