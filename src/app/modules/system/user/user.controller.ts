import { UserService } from "@/app/domain/system/user/services/user.service"
import hashidsHelper from "@/app/helpers/hashids.helper"
import { CreateUserDto } from "@/app/modules/system/user/dto/create-user.dto"
import { UpdateUserDto } from "@/app/modules/system/user/dto/update-user.dto"
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common"

const auth_id = 1
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(hashidsHelper.decode(id))
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create({ ...createUserDto, auth_id })
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(hashidsHelper.decode(id), { ...updateUserDto, auth_id })
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(hashidsHelper.decode(id))
  }
}
