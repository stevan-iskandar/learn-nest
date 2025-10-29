import { PersonalAccessTokenService } from "../domain/system/personal-access-token/services/personal-access-token.service"
import cryptoHelper from "../helpers/crypto.helper"
import { IS_PUBLIC_KEY } from "@/decorators/auth.decorator"
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { Request } from "express"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly personalAccessTokenService: PersonalAccessTokenService,
  ) { }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) return true

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if (!token) throw new UnauthorizedException

    const [personalAccessTokenId, TokenAPI] = token.split('|')
    const personalAccessToken = await this.personalAccessTokenService.findById(+personalAccessTokenId, {
      user: true,
    })

    if (!cryptoHelper.verify(TokenAPI, personalAccessToken.token)) throw new UnauthorizedException
    if (!personalAccessToken.user) throw new Error('User relation is not defined')

    request.user = personalAccessToken.user

    return true
  }
}