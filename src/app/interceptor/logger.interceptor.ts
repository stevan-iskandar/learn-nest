import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common"
import { Observable, tap } from "rxjs"

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const rpcContext = context.switchToRpc()
    const handler = context.getHandler().name
    const startTime = Date.now()

    console.log(`gRPC Call: ${handler}`, {
      data: rpcContext.getData(),
      metadata: rpcContext.getContext()
    })

    return next.handle().pipe(tap(data => {
      const duration = Date.now() - startTime
      console.log(`gRPC Response: ${handler}`, {
        duration: `${duration}ms`,
        response: data
      })
    }))
  }
}
