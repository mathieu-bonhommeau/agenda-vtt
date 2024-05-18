import { ReduxStore, setupStore } from '@/app/_common/business/store/store'

describe('Retrieve traces', () => {
    let sut: SUT

    beforeEach(() => {
        sut = new SUT()
    })

    it('not retrieve traces initially', async () => {
        expect(sut.traces).toEqual([])
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

    get traces() {
        return this._store.getState().tracesState.traces
    }
}

export interface TracesApiGateway {}

export class StubTracesGateway implements TracesApiGateway {}
