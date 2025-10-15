import { LoggerMiddleware } from "./app/middleware/logger.middleware"
import { AppModule } from "./app/modules/app.module"
import env from "./constants/env"
import { ClassSerializerInterceptor, HttpStatus, ValidationPipe } from "@nestjs/common"
import { NestFactory, Reflector } from "@nestjs/core"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(new LoggerMiddleware().use)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.useGlobalPipes(new ValidationPipe({
    // disableErrorMessages: env.appEnv === 'production',
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    exceptionFactory(errors) {
      const result = {}

      errors.forEach(error => {
        const { property, constraints, children } = error

        if (constraints) result[property] = Object.values(constraints)

        children?.length && children.forEach(child => {
          if (child.constraints) {
            result[`${property}.${child.property}`] = Object.values(child.constraints)
          }
        })
      })

      return result
    },
    transform: true,
    whitelist: true,
  }))

  await app.listen(env.appHostPort)
}
bootstrap()
