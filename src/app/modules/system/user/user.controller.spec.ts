import { UserController } from "./user.controller"
import { UserDomainModule } from "@/app/domain/system/user/user-domain.module"
import { Test, TestingModule } from "@nestjs/testing"

describe('UserController', () => {
  let controller: UserController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserDomainModule],
      controllers: [UserController],
    }).compile()

    controller = module.get<UserController>(UserController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
