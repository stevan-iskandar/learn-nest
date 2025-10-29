import { AuthController } from "./auth.controller"
import { LocalStrategy } from "./strategy/local.strategy"
import { PersonalAccessTokenDomainModule } from "@/app/domain/system/personal-access-token/personal-access-token.module"
import { UserDomainModule } from "@/app/domain/system/user/user-domain.module"
import { AuthGuard } from "@/app/guard/auth.guard"
import { Module } from "@nestjs/common"
import { APP_GUARD } from "@nestjs/core"
import { PassportModule } from "@nestjs/passport"

@Module({
  imports: [
    PersonalAccessTokenDomainModule,
    UserDomainModule,
    PassportModule,
  ],
  providers: [
    LocalStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule { }