//export type BikeType = 'allMountainXc' | 'enduro' | 'dhGravity'
//export type TraceLoop = 'all' | 'onlyLoop' | 'noLoop'

export type Trace = {
    id: string
    utagawaId?: number
    link?: string
    //bikeType: BikeType
    //duration: number
    distance: number
    positiveElevation?: number
    //negativeElevation: number
    //traceLoop: TraceLoop
    traceColor?: TraceColor
}
export type TraceColor = 'green' | 'blue' | 'red' | 'black'

export const traceLevelColor = { green: 1, blue: 2, red: 3, black: 4, notDefined: 5 }

//export type TraceDifficulty = {
//traceColor: TraceColor
//technicalDifficulty: number //de 1 à 6
//physicalDifficulty: number // de 1 à 6
//pushingCarrying: number // de 1 à 6
//}
