import { OauthGateway } from '../business/ports/oauth.gateway'
import { AuthTokens } from '../business/models/auth-tokens'
import { generators, Issuer } from 'openid-client'

export class UtagawaOauthGateway implements OauthGateway {
    async retrieveOAuthCode(clientID: string): Promise<string> {
        const issuer = await Issuer.discover('https://auth.utagawavtt.com/authorize')
        const client = new issuer.Client({
            client_id: clientID,
            redirect_uris: ['http://localhost:3000/auth/activation-code'],
            response_types: ['code'],
        })

        const code_verifier = generators.codeVerifier()
        const code_challenge = generators.codeChallenge(code_verifier)

        client.authorizationUrl({
            scope: 'user',
            code_challenge,
            code_challenge_method: 'S256',
        })
    }

    async retrieveTokens(code: string): Promise<AuthTokens> {
        const tokens = client.callbackParams()
    }
}
