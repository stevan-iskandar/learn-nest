import { ContextInterceptor } from "./app/interceptor/context.interceptor"
import { LoggerInterceptor } from "./app/interceptor/logger.interceptor"
import { AppModule } from "./app/modules/app.module"
import databaseSourceConfig from "./config/database-source.config"
import { AppValidationPipe } from "./config/pipe/app-validation.pipe"
import env from "./constants/env"
import { grpcOptions } from "./grpc/grpc.option"
import { ClassSerializerInterceptor } from "@nestjs/common"
import { NestFactory, Reflector } from "@nestjs/core"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  await databaseSourceConfig.initialize()
  app.useGlobalInterceptors(new ContextInterceptor)
  app.useGlobalInterceptors(new LoggerInterceptor)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.useGlobalPipes(new AppValidationPipe)

  app.connectMicroservice(grpcOptions)

  app.startAllMicroservices()

  await app.listen(env.appHostPort)
}
bootstrap()
