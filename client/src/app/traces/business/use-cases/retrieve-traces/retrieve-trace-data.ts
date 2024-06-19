import { Trace } from '@/app/traces/business/models/trace'
import { TracesApiGateway } from '@/app/traces/business/ports/traces-api.gateway'

export type RetrieveTraceDataCommand = {
    link: string
}

export const retrieveTraceData =
    ({ tracesApiGateway }: { tracesApiGateway: TracesApiGateway }) =>
    async (command: RetrieveTraceDataCommand): Promise<Partial<Trace> | null> => {
        return await tracesApiGateway.retrieveTraceData(command.link)
    }
