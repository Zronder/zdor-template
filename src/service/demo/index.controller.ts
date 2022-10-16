import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { DemoService } from './index.service'

@ApiTags('Demo服务接口')
@Controller('demo')
export class DemoController {
    constructor(private readonly appService: DemoService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello()
    }
}
