import { LoggerMiddleware } from "../middleware/logger.middleware"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { UserModule } from "./user/user.module"
import { database } from "@/config/database.config"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { DataSource } from "typeorm"

@Module({
  imports: [
    database,
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
