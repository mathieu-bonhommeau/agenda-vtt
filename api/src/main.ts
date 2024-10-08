import { NestFactory } from '@nestjs/core'
import { AppModule } from './_common/app/app.module'
import * as process from 'node:process'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import * as fs from 'node:fs'
import session from 'express-session'
import cookieParser from 'cookie-parser'

async function bootstrap() {
    console.log(process.env.POSTGRES_HOST)
    const app = await NestFactory.create(AppModule)

    AppModule.configureSwagger(app, '')
    app.enableShutdownHooks().enableCors()

    const document = SwaggerModule.createDocument(
        app,
        new DocumentBuilder()
            .setTitle('UtagawaVTT Agenda')
            .setDescription('Serverside API Specification of UtagawaVTT Agenda')
            .addServer('http://localhost:3000', 'localhost')
            .build(),
    )
    fs.writeFileSync('./swagger-spec.json', JSON.stringify(document))

    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
        }),
    )
    app.use(cookieParser())

    app.useGlobalPipes(new ValidationPipe({ transform: true }))

    await app.listen(process.env.NODE_PORT || 5000, () => console.log('Listen : http://localhost:5000'))
}

bootstrap().then()
