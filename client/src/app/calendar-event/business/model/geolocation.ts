export type LatLon = { lat: number; lon: number }

export type CenterCountry = Record<string, LatLon>

export const centerCountry: CenterCountry = { France: { lat: 46.540053201549426, lon: 2.430146578161524 } }
