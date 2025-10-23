import { LoggerMiddleware } from "./app/middleware/logger.middleware"
import { AppModule } from "./app/modules/app.module"
import databaseSourceConfig from "./config/database-source.config"
import { AppValidationPipe } from "./config/pipe/app-validation.pipe"
import env from "./constants/env"
import { ClassSerializerInterceptor } from "@nestjs/common"
import { NestFactory, Reflector } from "@nestjs/core"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  await databaseSourceConfig.initialize()
  app.use(new LoggerMiddleware().use)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.useGlobalPipes(new AppValidationPipe)

  await app.listen(env.appHostPort)
}
bootstrap()
