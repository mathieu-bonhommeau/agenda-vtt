import { Controller, Get, HttpCode, Inject, UnauthorizedException } from '@nestjs/common'
import { OauthGateway } from '../business/ports/oauth.gateway'

@Controller('auth')
export class AuthenticationController {
    constructor(@Inject('OAuthGateway') private readonly _oauthGateway: OauthGateway) {}

    @Get()
    @HttpCode(201)
    async authenticate() {
        const code = await this._oauthGateway.retrieveOAuthCode(process.env.OAUTH_CLIENT_ID)
        if (!code) return new UnauthorizedException()

        const tokens = await this._oauthGateway.retrieveTokens(code)
        if (!tokens) return new UnauthorizedException()

        return tokens
    }
}
