import { AuthController } from "./auth.controller"
import { LocalStrategy } from "./strategy/local.strategy"
import { PersonalAccessTokenDomainModule } from "@/app/domain/system/personal-access-token/personal-access-token.module"
import { UserDomainModule } from "@/app/domain/system/user/user-domain.module"
import { Module } from "@nestjs/common"
import { PassportModule } from "@nestjs/passport"

@Module({
  imports: [
    PersonalAccessTokenDomainModule,
    UserDomainModule,
    PassportModule,
  ],
  providers: [LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule { }