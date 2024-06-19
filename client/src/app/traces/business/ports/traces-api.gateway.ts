import { Trace } from '@/app/traces/business/models/trace'

export interface TracesApiGateway {
    retrieveTraceData(link: string): Promise<Partial<Trace> | null>
}