import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { ModifyUserService } from "@/app/domain/system/user/repositories/modify-user.repository"
import { Injectable } from "@nestjs/common"
import { DataSource } from "typeorm"

@Injectable()
export class UserService {
  constructor(
    private readonly modifyUserService: ModifyUserService,
    private readonly dataSource: DataSource,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const queryRunner = this.dataSource.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      await this.modifyUserService.store(createUserDto, queryRunner)

      await queryRunner.commitTransaction()
    } catch (err) {
      await queryRunner.rollbackTransaction()
      throw err
    } finally {
      await queryRunner.release()
    }
  }

  findAll() {
    return `This action returns all user`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
