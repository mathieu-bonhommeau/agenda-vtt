import { AuthTokens } from '../models/auth-tokens'

export interface OauthGateway {
    retrieveOAuthCode(clientID: string): Promise<string>

    retrieveTokens(code: string): Promise<AuthTokens>
}
