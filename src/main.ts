import { PORT } from '@config/index'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { LoggerGlobalExceptionsFilter, loggerMiddleware, setupSwagger } from '@utils/index'

console.log(process.env)

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    setupSwagger(app)

    app.use(loggerMiddleware)

    app.useGlobalFilters(new LoggerGlobalExceptionsFilter())

    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: false }))
    await app.listen(PORT)
}
bootstrap()
