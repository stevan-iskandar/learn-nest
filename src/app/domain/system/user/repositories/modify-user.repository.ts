import { User } from "../entities/user.entity"
import { FetchUserRepository } from "./fetch-user.repository"
import hashStringHelper from "@/app/helpers/hashString.helper"
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { FindOptionsWhere, QueryRunner, Repository } from "typeorm"

interface UserStore {
  first_name: string
  last_name: string
  username: string
  email: string
  password: string
  age: number
  auth_id: number
}

interface UserUpdate {
  first_name?: string
  last_name?: string
  username?: string
  email?: string
  age?: number
  auth_id: number
}

@Injectable()
export class ModifyUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly fetchUserRepository: FetchUserRepository
  ) { }

  async store({ username, password, auth_id, ...data }: UserStore, queryRunner?: QueryRunner): Promise<User> {
    const user = this.userRepository.create({
      ...data,
      username: username.toUpperCase(),
      password: hashStringHelper(password),
      created_by_id: auth_id,
      updated_by_id: auth_id,
    })

    return queryRunner
      ? queryRunner.manager.save(user)
      : this.userRepository.save(user)
  }

  async update(id: number, { auth_id, ...data }: UserUpdate, queryRunner?: QueryRunner): Promise<User> {
    const user = await this.fetchUserRepository.findById(id)

    if (data.first_name !== undefined)
      user.first_name = data.first_name
    if (data.last_name !== undefined)
      user.last_name = data.last_name
    if (data.username !== undefined)
      user.username = data.username.toUpperCase()
    if (data.email !== undefined)
      user.email = data.email
    if (data.age !== undefined)
      user.age = data.age

    user.updated_by_id = auth_id

    return queryRunner
      ? queryRunner.manager.save(user)
      : this.userRepository.save(user)
  }

  async delete(id: number, queryRunner?: QueryRunner) {
    const where: FindOptionsWhere<User> = { id }
    const result = queryRunner
      ? await queryRunner.manager.softDelete(User, where)
      : await this.userRepository.softDelete(where)

    return !!result.affected
  }
}