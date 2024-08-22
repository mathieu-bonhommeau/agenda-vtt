import { Controller, Get, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import axios from 'axios'
import pkceChallenge from 'pkce-challenge'

@Controller('auth')
export class AuthController {
    @Get('login')
    async login(@Req() req: Request, @Res() res: Response) {
        const pkce = pkceChallenge()
        req.session['code_verifier'] = pkce.code_verifier

        const authorizationUrl = `${process.env.OIDC_AUTHORIZATION_URL}?client_id=${process.env.OAUTH2_CLIENT_ID}&response_type=code&scope=user&code_challenge=${pkce.code_challenge}&code_challenge_method=S256`
        res.redirect(authorizationUrl)
    }

    @Get('activation-code')
    async callback(@Req() req: Request, @Res() res: Response) {
        const code = req.query.code

        if (code) {
            try {
                const response = await axios.post('https://auth.utagawavtt.com/token', {
                    code,
                    client_id: process.env.OAUTH2_CLIENT_ID,
                    grant_type: 'authorization_code',
                    code_verifier: req.session['code_verifier'],
                })

                const { access_token, refresh_token } = response.data

                res.cookie('access_token', access_token, { httpOnly: true })
                res.cookie('refresh_token', refresh_token, { httpOnly: true })
                res.redirect(process.env.OAUTH2_CALLBACK_URL)
            } catch (error) {
                console.log(error)
                res.redirect(process.env.OAUTH2_CALLBACK_URL)
            }
        } else {
            res.redirect('/login')
        }
    }
}
