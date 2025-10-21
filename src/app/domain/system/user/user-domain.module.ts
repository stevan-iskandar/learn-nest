import { User } from "./entities/user.entity"
import { FetchUserRepository } from "./repositories/fetch-user.repository"
import { ModifyUserRepository } from "./repositories/modify-user.repository"
import { UserService } from "./services/user.service"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    FetchUserRepository,
    ModifyUserRepository,
    UserService,
  ],
  exports: [UserService],
})
export class UserDomainModule { }