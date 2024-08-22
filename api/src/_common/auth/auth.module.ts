import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'

@Module({
    imports: [PassportModule.register({ defaultStrategy: 'oauth2' })],
    controllers: [AuthController],
})
export class AuthModule {}
