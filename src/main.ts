import { ContextInterceptor } from "./app/interceptor/context.interceptor"
import { LoggerInterceptor } from "./app/interceptor/logger.interceptor"
import { AppModule } from "./app/modules/app.module"
import databaseSourceConfig from "./config/database-source.config"
import { AppValidationPipe } from "./config/pipe/app-validation.pipe"
import env from "./constants/env"
import { ClassSerializerInterceptor } from "@nestjs/common"
import { NestFactory, Reflector } from "@nestjs/core"
import { MicroserviceOptions, Transport } from "@nestjs/microservices"
import path from "path"

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'hero',
      protoPath: path.join(__dirname, 'grpc/hero/hero.proto'),
      url: `0.0.0.0:${env.appHostPort}`,
    },
  })

  await databaseSourceConfig.initialize()
  app.useGlobalInterceptors(new ContextInterceptor)
  app.useGlobalInterceptors(new LoggerInterceptor)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.useGlobalPipes(new AppValidationPipe)

  await app.listen()
}
bootstrap()
