import { User } from "../entities/user.entity"
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

@Injectable()
export class FetchUserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id })
  }
}