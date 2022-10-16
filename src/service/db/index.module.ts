import { Global, Module } from '@nestjs/common'
import { DbService } from './index.service'

@Global()
@Module({
    providers: [DbService],
    exports: [DbService],
})
export class DbModule {}
