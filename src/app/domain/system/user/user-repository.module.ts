import { User } from "./entities/user.entity"
import { FetchUserService } from "./repositories/fetch-user.repository"
import { ModifyUserService } from "./repositories/modify-user.repository"
import { Module, Provider } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

const providers: Provider[] = [
  FetchUserService,
  ModifyUserService,
]

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers,
  exports: [
    ...providers,
    TypeOrmModule,
  ],
})
export class UserRepositoryModule { }