import { dataSourceOptions } from "./database-source.config"
import { TypeOrmModule } from "@nestjs/typeorm"

export const database = TypeOrmModule.forRoot(dataSourceOptions)