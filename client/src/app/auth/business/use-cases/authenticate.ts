describe('Authenticate the user', () => {
    let sut: SUT
    const clientID = '123456789'

    beforeEach(() => {
        sut = new SUT()
        sut.givenOauthCodes
    })

    it('authenticate the user with tokens', async () => {
        const code = await sut.getCode(clientID)
    })
})

class SUT {
    private _oauthGateway: Promise<StubOauthGateway>

    async getCode(clientID: string) {
        return this._oauthGateway
    }
}

interface OauthGateway {
    retrieveOAuthCode(clientID: string): Promise<string>
}

class StubOauthGateway implements OauthGateway {
    private _code: Array<{clientID: string; code: string}> = []

    async retrieveOAuthCode(clientID: string): Promise<string> {
        throw new Error('Method not implemented.')
    }
}
