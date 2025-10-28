import { FetchPersonalAccessTokenRepository } from "../repositories/fetch-personal-access-token.repository"
import { ModifyPersonalAccessTokenRepository } from "../repositories/modify-personal-access-token.repository"
import { BaseService } from "@/app/core/services/base.sefvice"
import { Injectable } from "@nestjs/common"
import { Dayjs } from "dayjs"
import { DataSource, QueryRunner } from "typeorm"

interface PersonalAccessTokenStore {
  user_id: number
  name: string
  token: string
  abilities: string[]
  expired_at: Dayjs
}

@Injectable()
export class PersonalAccessTokenService extends BaseService {
  constructor(
    private readonly fetchPersonalAccessTokenRepository: FetchPersonalAccessTokenRepository,
    private readonly modifyPersonalAccessTokenRepository: ModifyPersonalAccessTokenRepository,
    dataSource: DataSource,
  ) {
    super(dataSource)
  }

  async findById(id: number) {
    return this.fetchPersonalAccessTokenRepository.findById(id)
  }

  async create(data: PersonalAccessTokenStore, queryRunner?: QueryRunner) {
    return this.executeInTransaction(async queryRunner => {
      return this.modifyPersonalAccessTokenRepository.store(data, queryRunner)
    }, queryRunner)
  }

  async updateLastUsed(queryRunner?: QueryRunner) {
    return this.executeInTransaction(async queryRunner => {
      return this.modifyPersonalAccessTokenRepository.updateLastUsed(queryRunner)
    }, queryRunner)
  }

  async delete(id: number, queryRunner?: QueryRunner) {
    return this.executeInTransaction(async queryRunner => {
      return this.modifyPersonalAccessTokenRepository.delete(id, queryRunner)
    }, queryRunner)
  }
}