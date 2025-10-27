import { ConfigModule } from "@nestjs/config"

export const envConfig = ConfigModule.forRoot({
  envFilePath: ['.env.development', '.env.production', '.env'],
  isGlobal: true,
})

type DBConnect = "postgres" | "mysql" | "mariadb" | "sqlite" | "oracle" | "mongodb"

export default {
  appName: process.env.APP_NAME ?? 'Nest JS',
  appProtocol: process.env.APP_PROTOCOL ?? 'http',
  appHost: process.env.APP_HOST ?? 'localhost',
  appPort: parseInt(process.env.APP_PORT ?? '3000'),
  appHostPort: parseInt(process.env.APP_HOST_PORT ?? '3000'),
  appEnv: process.env.APP_ENV ?? 'development',

  dbConnect: (process.env.DB_CONNECTION ?? 'postgres') as DBConnect,
  dbHost: process.env.DB_HOST ?? 'localhost',
  dbPort: parseInt(process.env.DB_PORT ?? '5432'),
  dbDatabase: process.env.DB_DATABASE ?? 'postgres',
  dbUsername: process.env.DB_USERNAME ?? 'postgres',
  dbPassword: process.env.DB_PASSWORD ?? '',

  bcryptRound: parseInt(process.env.BCRYPT_ROUND ?? '12'),

  jwtSecret: process.env.JWT_SECRET ?? 'mySecretKey',

  hashidsSalt: process.env.HASHIDS_SALT ?? 'mySecretSalt',
  hashidsLength: parseInt(process.env.HASHIDS_LENGTH ?? '8'),
}