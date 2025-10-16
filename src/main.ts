import { LoggerMiddleware } from "./app/middleware/logger.middleware"
import { AppModule } from "./app/modules/app.module"
import { AppValidationPipe } from "./config/pipe/app-validation.pipe"
import env from "./constants/env"
import { ClassSerializerInterceptor } from "@nestjs/common"
import { NestFactory, Reflector } from "@nestjs/core"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(new LoggerMiddleware().use)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.useGlobalPipes(new AppValidationPipe)

  await app.listen(env.appHostPort)
}
bootstrap()
