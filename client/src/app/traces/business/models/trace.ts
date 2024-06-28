export type Trace = {
    id: string
    utagawaId?: number
    link?: string
    distance: number
    positiveElevation?: number
    traceColor?: TraceColor | 'notDefined'
}
export type TraceColor = 'green' | 'blue' | 'red' | 'black'

export const traceLevelColor = { green: 1, blue: 2, red: 3, black: 4, notDefined: 5 }
