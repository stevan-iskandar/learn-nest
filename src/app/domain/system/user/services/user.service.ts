import { FetchUserRepository } from "../repositories/fetch-user.repository"
import { BaseService } from "@/app/core/services/base.sefvice"
import { ModifyUserRepository } from "@/app/domain/system/user/repositories/modify-user.repository"
import { Injectable } from "@nestjs/common"
import { DataSource, QueryRunner } from "typeorm"

interface UserStore {
  first_name: string
  last_name: string
  email: string
  password: string
  age: number
  auth_id: number
}

interface UserUpdate {
  first_name?: string
  last_name?: string
  email?: string
  age?: number
  auth_id: number
}

@Injectable()
export class UserService extends BaseService {
  constructor(
    private readonly fetchUserRepository: FetchUserRepository,
    private readonly modifyUserRepository: ModifyUserRepository,
    dataSource: DataSource,
  ) {
    super(dataSource)
  }

  async findAll() {
    return this.fetchUserRepository.findAll()
  }

  async findOne(id: number) {
    return this.fetchUserRepository.findById(id)
  }

  async create(data: UserStore, queryRunner?: QueryRunner) {
    return this.executeInTransaction(async queryRunner => {
      return this.modifyUserRepository.store(data, queryRunner)
    }, queryRunner)
  }

  async update(id: number, data: UserUpdate, queryRunner?: QueryRunner) {
    return this.executeInTransaction(async queryRunner => {
      return this.modifyUserRepository.update(id, data, queryRunner)
    }, queryRunner)
  }

  async remove(id: number, queryRunner?: QueryRunner) {
    return this.executeInTransaction(async queryRunner => {
      return this.modifyUserRepository.delete(id, queryRunner)
    }, queryRunner)
  }
}
