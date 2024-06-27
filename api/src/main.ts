import { NestFactory } from '@nestjs/core'
import { AppModule } from './_common/app/app.module'
import * as process from 'node:process'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    await app.listen(process.env.NODE_PORT || 5000, () => console.log('Listen : http://localhost:5000'))
}
bootstrap().then()
