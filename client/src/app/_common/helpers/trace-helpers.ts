import { Trace } from '@/app/traces/business/models/trace'
import { difficultyColorsStyle } from '@/theme/theme'

export const determineTraceColor = (trace: Trace) =>
    trace.traceColor ? difficultyColorsStyle[trace.traceColor] : 'grey'
