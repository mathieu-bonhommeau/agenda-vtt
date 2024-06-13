import { Trace } from '@/app/traces/business/models/trace'
import { TracesApiGateway } from '@/app/traces/business/ports/traces-api.gateway'

export class DemoTracesApiGateway implements TracesApiGateway {
    public traces: { [link: string]: Partial<Trace> } = {}
    async retrieveTraceData(link: string): Promise<Partial<Trace> | null> {
        return this.traces[link]
    }
}
