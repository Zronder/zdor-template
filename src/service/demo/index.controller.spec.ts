import { Test, TestingModule } from '@nestjs/testing'
import { DemoController } from './index.controller'
import { DemoService } from './index.service'

describe('DemoController', () => {
    let appController: DemoController

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [DemoController],
            providers: [DemoService],
        }).compile()

        appController = app.get<DemoController>(DemoController)
    })

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(appController.getHello()).toBe('Hello World!')
        })
    })
})
