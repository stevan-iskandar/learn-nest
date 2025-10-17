import env from "@/constants/env"
import path from "path"
import { DataSource } from "typeorm"

const isDevelopment = env.appEnv === 'development'
export default new DataSource({
  type: env.dbConnect,
  host: env.dbHost,
  port: env.dbPort,
  username: env.dbUsername,
  password: env.dbPassword,
  database: env.dbDatabase,
  logging: isDevelopment,
  synchronize: isDevelopment,
  entities: [
    path.join(__dirname, './../app/domain/**/*.entity.ts'),
  ],
  migrations: [
    path.join(__dirname, './../database/migrations/*.ts'),
  ],
})