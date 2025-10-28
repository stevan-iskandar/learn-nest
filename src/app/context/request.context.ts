import type { User } from '../domain/system/user/entities/user.entity'
import { UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'

export class RequestContext {
  private static _current: Request | undefined

  static setCurrentRequest(req: Request) {
    this._current = req
  }

  static getCurrentRequest(): Request | undefined {
    return this._current
  }

  static getCurrentUser(): User {
    if (!this._current?.user) throw new UnauthorizedException
    return this._current.user as User
  }
}