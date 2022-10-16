import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { Logger } from './log4js.config'

@Catch()
export class LoggerGlobalExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        const request = ctx.getRequest()

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR

        // const logFormat = ` Request original url: ${request.originalUrl} ; Method: ${request.method} ; IP: ${request.ip} ; Status code: ${status} ; Response: ${exception}`
        const logFormat = `Request original url: ${request.originalUrl} ; Method: ${
            request.method
        } ; IP: ${request.ip} ; Status code: ${status} ; Parmas: ${JSON.stringify(
            request.params,
        )} ; Query: ${JSON.stringify(request.query)} ; Body: ${JSON.stringify(
            request.body,
        )} ;  Response: ${exception}`

        Logger.error(logFormat)

        // response.status(status).json({
        //     statusCode: status,
        //     date: new Date().toLocaleDateString(),
        //     path: request.url,
        //     message: status >= 500 ? '服务端错误' : '客户端错误',
        // })

        const responseBody =
            exception instanceof HttpException
                ? exception.getResponse()
                : {
                      statusCode: status,
                      message: `${exception}`,
                  }

        response.status(status).json(responseBody)
    }
}
