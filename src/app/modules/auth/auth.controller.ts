import { LocalAuthGuard } from "./guard/local-auth.guard"
import { PersonalAccessTokenService } from "@/app/domain/system/personal-access-token/services/personal-access-token.service"
import type { User } from "@/app/domain/system/user/entities/user.entity"
import cryptoHelper from "@/app/helpers/crypto.helper"
import randomStringHelper from "@/app/helpers/randomString.helper"
import { Controller, Post, Req, UseGuards } from "@nestjs/common"
import dayjs from "dayjs"
import type { Request } from "express"

@Controller()
export class AuthController {
  constructor(
    private readonly personalAccessTokenService: PersonalAccessTokenService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    const user = req.user as User
    const randomString = randomStringHelper()

    const personalAccessToken = await this.personalAccessTokenService.create({
      user_id: user.id,
      name: 'app',
      token: cryptoHelper.sign(randomString),
      abilities: ['*'],
      expired_at: dayjs().add(7, 'day'),
    })

    return {
      data: {
        token: `${personalAccessToken.id}|${randomString}`,
        user,
      },
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Req() req: Request) {
    return req.logout({ keepSessionInfo: false }, (err) => { throw err })
  }
}