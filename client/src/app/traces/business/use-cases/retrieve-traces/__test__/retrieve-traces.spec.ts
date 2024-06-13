import { ReduxStore, setupStore } from '@/app/_common/business/store/store'
import { Trace } from '@/app/traces/business/models/trace'
import { TracesApiGateway } from '@/app/traces/business/ports/traces-api.gateway'
import { retrieveTraceData } from '@/app/traces/business/use-cases/retrieve-traces/retrieve-trace-data'

describe('Retrieve trace data', () => {
    let sut: SUT
    const traceLink =
        'https://www.utagawavtt.com/randonnee-vtt-gps/Seyssinet-parc-Karl-Marx-Desert-de-Jean-Jacques-Rousseau-43872'

    beforeEach(() => {
        sut = new SUT()
    })

    it('retrieve trace data from utagawa link', async () => {
        sut.givenLinkTraceData(traceLink, {
            utagawaId: 123456,
            distance: 52,
            positiveElevation: 250,
            traceColor: 'blue',
        })

        const traceData = await sut.retrieveTraceData(traceLink)

        expect(traceData).toEqual(traceData)
    })

    it('retrieve null if not trace matches with link', async () => {
        const traceData = await sut.retrieveTraceData(traceLink)

        expect(traceData).toEqual(null)
    })
})

class SUT {
    private readonly _tracesGateway: StubTracesGateway
    private readonly _store: ReduxStore

    constructor() {
        this._tracesGateway = new StubTracesGateway()
        this._store = setupStore({
            tracesApiGateway: this._tracesGateway,
        })
    }

    givenLinkTraceData(link: string, traceData: Partial<Trace>) {
        this._tracesGateway.feedWith(link, traceData)
    }

    async retrieveTraceData(link: string) {
        return retrieveTraceData({ tracesApiGateway: this._tracesGateway })({ link })
    }
}

class StubTracesGateway implements TracesApiGateway {
    private _traces: { [link: string]: Partial<Trace> } = {}

    async retrieveTraceData(link: string): Promise<Partial<Trace> | null> {
        return this._traces[link] || null
    }

    feedWith(link: string, traceData: Partial<Trace>) {
        this._traces[link] = traceData
    }
}
