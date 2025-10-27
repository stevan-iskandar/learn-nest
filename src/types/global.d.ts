namespace NodeJS {
  interface ProcessEnv {
    APP_NAME?: string
    APP_PROTOCOL?: string
    APP_HOST?: string
    APP_PORT?: string
    APP_HOST_PORT?: string
    APP_ENV?: 'development' | 'production'

    DB_CONNECTION?: string
    DB_HOST?: string
    DB_PORT?: string
    DB_DATABASE?: string
    DB_USERNAME?: string
    DB_PASSWORD?: string

    BCRYPT_ROUND?: string

    JWT_SECRET?: string

    HASHIDS_SALT?: string
    HASHIDS_LENGTH?: string
  }
}