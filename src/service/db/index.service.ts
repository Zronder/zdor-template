import { PrismaClient } from '@prisma/client'

export class DbService extends PrismaClient {
    constructor() {
        super()
        this.$use(async (params, next) => {
            return next(params)
        })
    }
}
