import env from "@/constants/env"
import path from "path"
import { DataSource, DataSourceOptions } from "typeorm"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"

const isDevelopment = env.appEnv === 'development'

export const dataSourceOptions: DataSourceOptions = {
  type: env.dbConnect,
  host: env.dbHost,
  port: env.dbPort,
  username: env.dbUsername,
  password: env.dbPassword,
  database: env.dbDatabase,
  logging: isDevelopment,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [
    path.join(__dirname, './../app/domain/**/*.entity.js'),
  ],
  migrations: [
    path.join(__dirname, './../database/migrations/*.ts'),
  ],
}

export default new DataSource(dataSourceOptions)