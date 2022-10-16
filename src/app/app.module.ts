import { Global, Module, ModuleMetadata } from '@nestjs/common'
import { DbModule } from '@service/index'
import { AppController } from './app.controller'
import { AppService } from './app.service'

const imports: ModuleMetadata['imports'] = [DbModule]

@Global()
@Module({
    imports: imports,
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
