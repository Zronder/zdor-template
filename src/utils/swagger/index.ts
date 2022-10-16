import { INestApplication } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { isEnableSwagger } from '@config/index'

const swaggerConfig = new DocumentBuilder()
    .setTitle('one server')
    .setVersion('1.0')
    .addBearerAuth(
        {
            type: 'apiKey',
            name: '',
            in: 'header',
            description: '',
        },
        '',
    )
    .build()

export const setupSwagger = (app: INestApplication) => {
    if (!isEnableSwagger) return
    const document = SwaggerModule.createDocument(app, swaggerConfig)
    SwaggerModule.setup('api', app, document)
}
