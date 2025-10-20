import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { UserService } from "./user.service"
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common"

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // if (typeof createUserDto.age !== 'number') throw new HttpException(
    //   'age is not typeof number',
    //   HttpStatus.UNPROCESSABLE_ENTITY,
    // )
    return this.userService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
