import { User } from "../entities/user.entity"
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { EntityNotFoundError, FindOptionsWhere, Repository } from "typeorm"

@Injectable()
export class FetchUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  async findById(id: number): Promise<User> {
    const where: FindOptionsWhere<User> = { id }
    const result = await this.usersRepository.findOne({ where })

    if (!result) throw new EntityNotFoundError(User, where)

    return result
  }
}