import { UserController } from "./user.controller"
import { UserService } from "./user.service"
import { UserRepositoryModule } from "@/app/domain/system/user/user-repository.module"
import { Module } from "@nestjs/common"

@Module({
  imports: [UserRepositoryModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
