import { RequestContext } from "../context/request.context"
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common"
import { Request } from "express"
import { Observable } from "rxjs"

@Injectable()
export class ContextInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    RequestContext.setCurrentRequest(context.switchToHttp().getRequest<Request>())

    return next.handle()
  }
}