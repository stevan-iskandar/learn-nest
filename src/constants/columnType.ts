import env from "./env"

const { dbConnect } = env

const bigInt = () => {
  switch (dbConnect) {
    case 'postgres':
      return 'bigint'
    default:
      return 'int'
  }
}

const datetime = () => {
  switch (dbConnect) {
    case 'postgres':
      return 'timestamptz'
    default:
      return 'datetime'
  }
}

export default {
  int: 'int',
  bigInt: bigInt(),
  varchar: 'varchar',
  boolean: 'boolean',
  datetime: datetime(),
}