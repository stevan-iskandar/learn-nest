import { AuthController } from "./auth.controller"
import { LocalStrategy } from "./strategy/local.strategy"
import { UserDomainModule } from "@/app/domain/system/user/user-domain.module"
import { Module } from "@nestjs/common"
import { PassportModule } from "@nestjs/passport"

@Module({
  imports: [UserDomainModule, PassportModule],
  providers: [LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule { }