import { INestApplication, MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CalendarEventModule } from '../../calendar-event/_config/calendar-event.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AuthModule } from '../auth/auth.module'

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), CalendarEventModule, AuthModule],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    static configureSwagger(app: INestApplication, swaggerBasePath: string) {
        app.setGlobalPrefix(`/${swaggerBasePath}`)
        const options = new DocumentBuilder()
            .setTitle('UtagawaVTT Agenda')
            .setDescription('Serverside API Specification of UtagawaVTT Agenda')
            .build()

        const document = SwaggerModule.createDocument(app, options)
        SwaggerModule.setup(swaggerBasePath, app, document)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    configure(consumer: MiddlewareConsumer) {}
}
