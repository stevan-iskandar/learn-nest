import { LocalAuthGuard } from "./guard/local-auth.guard"
import { Controller, Post, Req, UseGuards } from "@nestjs/common"
import type { Request } from "express"

@Controller()
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return req.user
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Req() req: Request) {
    return req.logout({ keepSessionInfo: false }, (err) => { throw err })
  }
}