import { OauthGateway } from '../../ports/oauth.gateway'
import { AuthTokens } from '../../models/auth-tokens'

describe('Authenticate the user', () => {
    let sut: SUT
    const clientID = '123456789'

    beforeEach(() => {
        sut = new SUT({ clientID })
        sut.givenAuthentication()
    })

    it('authenticate the user with tokens', async () => {
        const code = await sut.getCode()
        expect(code).toEqual('random_code')

        const tokens = await sut.getTokens(code)

        expect(tokens).toEqual({
            token_type: 'Bearer',
            expires_in: 86400,
            access_token: 'random_access_token',
            refresh_token: 'random_refresh_token',
        })
    })
})

class SUT {
    private readonly _oauthGateway: StubOauthGateway
    private readonly _clientID: string

    constructor({ clientID }: { clientID: string }) {
        this._oauthGateway = new StubOauthGateway()
        this._clientID = clientID
    }

    givenAuthentication() {
        this._oauthGateway.feedWithCode({
            clientID: this._clientID,
            code: 'random_code',
        })
        this._oauthGateway.feedWithTokens('random_code', {
            token_type: 'Bearer',
            expires_in: 86400,
            access_token: 'random_access_token',
            refresh_token: 'random_refresh_token',
        })
    }

    async getCode() {
        return this._oauthGateway.retrieveOAuthCode(this._clientID)
    }

    async getTokens(code: string) {
        return this._oauthGateway.retrieveTokens(code)
    }
}

class StubOauthGateway implements OauthGateway {
    private _code: Array<{ clientID: string; code: string }> = []
    private _tokens: Array<{ code: string; tokens: AuthTokens }> = []

    async retrieveOAuthCode(clientID: string): Promise<string> {
        return this._code.find((c) => c.clientID === clientID)?.code || null
    }

    async retrieveTokens(code: string): Promise<AuthTokens> {
        return this._tokens.find((t) => t.code === code).tokens || null
    }

    feedWithCode(code: { clientID: string; code: string }): void {
        this._code.push(code)
    }

    feedWithTokens(code: string, tokens: AuthTokens): void {
        this._tokens.push({ code, tokens })
    }
}
