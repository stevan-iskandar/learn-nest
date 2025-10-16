import { TransformNumber } from "@/app/helpers/transformer/TransformNumber.transformer"
import { Confirmed, Email, Required } from "@/app/helpers/validator/rules"
import { IsNumber } from "class-validator"

export class CreateUserDto {
  @Required()
  name: string

  @Required()
  @TransformNumber()
  @IsNumber()
  age: number

  @Required()
  @Email({
    host_blacklist: ['email.com'],
  })
  email: string

  @Required()
  phone: string

  @Required()
  @Confirmed('password_confirmation')
  password: string

  @Required()
  password_confirmation: string
}
