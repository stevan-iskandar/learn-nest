import { PersonalAccessToken } from "./entities/personal-access-token.entity"
import { FetchPersonalAccessTokenRepository } from "./repositories/fetch-personal-access-token.repository"
import { ModifyPersonalAccessTokenRepository } from "./repositories/modify-personal-access-token.repository"
import { PersonalAccessTokenService } from "./services/personal-access-token.service"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
  imports: [TypeOrmModule.forFeature([PersonalAccessToken])],
  providers: [
    FetchPersonalAccessTokenRepository,
    ModifyPersonalAccessTokenRepository,
    PersonalAccessTokenService,
  ],
  exports: [PersonalAccessTokenService],
})
export class PersonalAccessTokenDomainModule { }