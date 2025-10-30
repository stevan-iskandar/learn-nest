import { LocalAuthGuard } from "./guard/local-auth.guard"
import { PersonalAccessTokenService } from "@/app/domain/system/personal-access-token/services/personal-access-token.service"
import type { User } from "@/app/domain/system/user/entities/user.entity"
import cryptoHelper from "@/app/helpers/crypto.helper"
import randomStringHelper from "@/app/helpers/randomString.helper"
import { Public } from "@/decorators/auth.decorator"
import { HeroService } from "@/grpc/hero/hero.interface"
import { Controller, Get, Inject, OnModuleInit, Post, Req, UseGuards } from "@nestjs/common"
import type { ClientGrpc } from "@nestjs/microservices"
import dayjs from "dayjs"
import type { Request } from "express"

@Controller()
export class AuthController implements OnModuleInit {
  private heroService: HeroService

  constructor(
    @Inject('HERO_PACKAGE')
    private readonly client: ClientGrpc,
    private readonly personalAccessTokenService: PersonalAccessTokenService
  ) { }

  onModuleInit() {
    this.heroService = this.client.getService<HeroService>('HeroService')
  }

  @Public()
  @Get('test')
  test() {
    const hero = this.heroService.findOne({ id: 1 })
    console.log(hero)
    return hero
  }

  @Public()
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