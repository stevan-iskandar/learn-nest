import { LoggerMiddleware } from "../middleware/logger.middleware"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AuthModule } from "./auth/auth.module"
import { UserModule } from "./system/user/user.module"
import { database } from "@/config/database.config"
import { envConfig } from "@/constants/env"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { DataSource } from "typeorm"

@Module({
  imports: [
    envConfig,
    database,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) { }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
  }
}
