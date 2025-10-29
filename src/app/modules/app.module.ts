import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AuthModule } from "./auth/auth.module"
import { UserModule } from "./system/user/user.module"
import { database } from "@/config/database.config"
import { envConfig } from "@/constants/env"
import { Module } from "@nestjs/common"

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
export class AppModule { }
