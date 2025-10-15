export default {
  appName: process.env.APP_NAME ?? 'Nest JS',
  appProtocol: process.env.APP_PROTOCOL ?? 'http',
  appHost: process.env.APP_HOST ?? 'localhost',
  appPort: parseInt(process.env.APP_PORT ?? '3000'),
  appHostPort: parseInt(process.env.APP_HOST_PORT ?? '3000'),
  appEnv: process.env.APP_ENV ?? 'development',

  dbConnect: process.env.DB_CONNECTION ?? 'postgres',
  dbHost: process.env.DB_HOST ?? 'localhost',
  dbPort: parseInt(process.env.DB_PORT ?? '5432'),
  dbName: process.env.DB_NAME ?? 'postgres',
  dbUser: process.env.DB_USER ?? 'postgres',
  dbPassword: process.env.DB_PASSWORD ?? '',

  hashidsSalt: process.env.HASHIDS_SALT ?? 'mySecretSalt',
  hashidsLength: parseInt(process.env.HASHIDS_LENGTH ?? '8'),
}