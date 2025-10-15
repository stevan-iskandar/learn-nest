import env from "@/constants/env"
import Hashids from "hashids"

const hashids = new Hashids(env.hashidsSalt, env.hashidsLength)

export default {
  encode: (id: number) => {
    const min = 1
    const max = 100
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min)

    return hashids.encode([randomNumber, id])
  },
  decode: (encryption_id: string) => hashids.decode(encryption_id)[1] as number
}