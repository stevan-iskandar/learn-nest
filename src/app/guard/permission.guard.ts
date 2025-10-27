import { PERMISSIONS_KEY } from "@/decorators/permission.decorator"
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Reflector } from "@nestjs/core"

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (!requiredPermissions) {
      return true
    }
    const { user } = context.switchToHttp().getRequest()
    return requiredPermissions.some((role) => user.roles?.includes(role))
  }
}