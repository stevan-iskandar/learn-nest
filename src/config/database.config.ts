import { ConfigModule, ConfigService } from "@nestjs/config"
import { dataSourceOptions } from "./database-source.config"
import { TypeOrmModule } from "@nestjs/typeorm"

export const database = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: () => dataSourceOptions,
})