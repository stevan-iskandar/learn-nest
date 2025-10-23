import { User } from "@/app/domain/system/user/entities/user.entity"
import { TransformNumber } from "@/app/helpers/transformer/TransformNumber.transformer"
import { Confirmed, Unique } from "@/app/helpers/validator/rules"
import { IsEmail, IsNotEmpty, IsNumber } from "class-validator"

export class CreateUserDto {
  @IsNotEmpty()
  @Unique(User, 'first_name')
  first_name: string

  @IsNotEmpty()
  last_name: string

  @IsNotEmpty()
  @IsEmail({
    host_blacklist: ['emaill.com'],
  })
  email: string

  @IsNotEmpty()
  @Confirmed('password_confirmation')
  password: string

  @IsNotEmpty()
  password_confirmation: string

  @IsNotEmpty()
  @TransformNumber()
  @IsNumber()
  age: number
}
