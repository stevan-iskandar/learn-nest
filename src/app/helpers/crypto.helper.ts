import env from "@/constants/env"
import crypto from "crypto"

export default {
  sign(data: string) {
    return crypto.createHash('sha256').update(`${data}_${env.dbDatabase}`).digest('hex')
  },
  verify(data: string, signature: string) {
    return this.sign(`${data}_${env.dbDatabase}`) === signature
  },
}