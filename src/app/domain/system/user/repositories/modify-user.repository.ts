import { User } from "../entities/user.entity"
import { CreateUserDto } from "@/app/modules/user/dto/create-user.dto"
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { QueryRunner, Repository } from "typeorm"

@Injectable()
export class ModifyUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async store(storeUserDto: CreateUserDto, queryRunner?: QueryRunner): Promise<User> {
    const user = this.userRepository.create(storeUserDto)
    if (queryRunner)
      return queryRunner.manager.save(user)

    return this.userRepository.save(user)
  }
}