import { CreateUserDto } from "./create-user.dto"
import { User } from "@/app/domain/system/user/entities/user.entity"
import { Unique } from "@/app/helpers/validator/rules"
import { OmitType } from "@nestjs/mapped-types"
import { IsNotEmpty } from "class-validator"

export class UpdateUserDto extends OmitType(CreateUserDto, [
  'password',
  'password_confirmation',
]) {
  @IsNotEmpty()
  @Unique(User, 'first_name', { excludeSelf: true })
  first_name: string
}
