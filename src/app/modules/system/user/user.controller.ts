import { CreateUserDto } from "@/app/modules/system/user/dto/create-user.dto"
import { UpdateUserDto } from "@/app/modules/system/user/dto/update-user.dto"
import { UserService } from "@/app/domain/system/user/services/user.service"
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common"

const auth_id = 1
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id)
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create({ ...createUserDto, auth_id })
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, { ...updateUserDto, auth_id })
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id)
  }
}
