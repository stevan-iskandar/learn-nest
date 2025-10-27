import { User } from "@/app/domain/system/user/entities/user.entity"
import { UserService } from "@/app/domain/system/user/services/user.service"
import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import bcrypt from "bcrypt"
import { Strategy } from "passport-local"

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super()
  }

  async validate(username: string, password: string): Promise<User | undefined> {
    const user = await this.userService.findByUsername(username)
    const validate = bcrypt.compareSync(password, user.password)

    if (!validate) {
      throw new UnauthorizedException
    }
    return user
  }
}