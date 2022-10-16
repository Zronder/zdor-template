import { Request, Response } from 'express'
import { Logger } from './log4js.config'

// 函数式中间件
export function loggerMiddleware(req: Request, res: Response, next: () => any) {
    const code = res.statusCode
    next()
    const logFormat = `Request original url: ${req.originalUrl} ; Method: ${req.method} ; IP: ${
        req.ip
    } ; Status code: ${code} ; Parmas: ${JSON.stringify(req.params)} ; Query: ${JSON.stringify(
        req.query,
    )} ; Body: ${JSON.stringify(req.body)}`
    if (code >= 500) {
        Logger.error(logFormat)
    } else if (code >= 400) {
        Logger.warn(logFormat)
    } else {
        // 正常情况下所有请求默认保存到access对于日志文件中，不打印在控制台
        Logger.access(logFormat)
    }
}
