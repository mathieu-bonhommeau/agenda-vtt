describe('Authenticate the user', () => {
    let sut: SUT
    const clientID = '123456789'

    beforeEach(() => {
        sut = new SUT({ clientID })
        sut.givenOauthCodes()
    })

    it('authenticate the user with tokens', async () => {
        const code = await sut.getCode()
        expect(code).toEqual('random_code')

        const tokens = await sut.getTokens()
        expect(tokens).toEqual({})
    })
})

class SUT {
    private readonly _oauthGateway: StubOauthGateway
    private readonly _clientID: string

    constructor({ clientID }: { clientID: string }) {
        this._oauthGateway = new StubOauthGateway()
        this._clientID = clientID
    }

    givenOauthCodes() {
        this._oauthGateway.feedWith({
            clientID: this._clientID,
            code: 'random_code',
        })
    }

    async getCode() {
        return this._oauthGateway.retrieveOAuthCode(this._clientID)
    }
}

interface OauthGateway {
    retrieveOAuthCode(clientID: string): Promise<string>
}

class StubOauthGateway implements OauthGateway {
    private _code: Array<{ clientID: string; code: string }> = []

    async retrieveOAuthCode(clientID: string): Promise<string> {
        return this._code.find((c) => c.clientID === clientID)?.code || null
    }

    feedWith(code: { clientID: string; code: string }): void {
        this._code.push(code)
    }
}
