import { PersonalAccessToken } from "../entities/personal-access-token.entity"
import { FetchPersonalAccessTokenRepository } from "./fetch-personal-access-token.repository"
import { RequestContext } from "@/app/context/request.context"
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Dayjs } from "dayjs"
import { FindOptionsWhere, QueryRunner, Repository } from "typeorm"

interface PersonalAccessTokenStore {
  user_id: number
  name: string
  token: string
  abilities: string[]
  expired_at: Dayjs
}

@Injectable()
export class ModifyPersonalAccessTokenRepository {
  constructor(
    @InjectRepository(PersonalAccessToken)
    private readonly personalAccessTokenRepository: Repository<PersonalAccessToken>,
    private readonly fetchPersonalAccessTokenRepository: FetchPersonalAccessTokenRepository,
  ) { }

  async store(data: PersonalAccessTokenStore, queryRunner?: QueryRunner): Promise<PersonalAccessToken> {
    const user = this.personalAccessTokenRepository.create({
      ...data,
      expired_at: data.expired_at.toDate(),
    })

    return queryRunner
      ? queryRunner.manager.save(user)
      : this.personalAccessTokenRepository.save(user)
  }

  async updateLastUsed(queryRunner?: QueryRunner) {
    const user = RequestContext.getCurrentUser()
    const personalAccessToken = await this.fetchPersonalAccessTokenRepository.findById(user.id)

    personalAccessToken.last_used_at = new Date

    queryRunner
      ? queryRunner.manager.save(user)
      : this.personalAccessTokenRepository.save(user)
  }

  async delete(id: number, queryRunner?: QueryRunner) {
    const where: FindOptionsWhere<PersonalAccessToken> = { id }
    const result = queryRunner
      ? await queryRunner.manager.delete(PersonalAccessToken, where)
      : await this.personalAccessTokenRepository.delete(where)

    return !!result.affected
  }
}