import { UserController } from "./user.controller"
import { UserDomainModule } from "@/app/domain/system/user/user-domain.module"
import { Module } from "@nestjs/common"

@Module({
  imports: [UserDomainModule],
  controllers: [UserController],
})
export class UserModule { }
