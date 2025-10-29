import { AuthController } from "./auth.controller"
import { LocalStrategy } from "./strategy/local.strategy"
import { PersonalAccessTokenDomainModule } from "@/app/domain/system/personal-access-token/personal-access-token.module"
import { UserDomainModule } from "@/app/domain/system/user/user-domain.module"
import { PassportModule } from "@nestjs/passport"
import { Test, TestingModule } from "@nestjs/testing"

describe('AuthController', () => {
  let controller: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PersonalAccessTokenDomainModule,
        UserDomainModule,
        PassportModule,
      ],
      providers: [LocalStrategy],
      controllers: [AuthController],
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
