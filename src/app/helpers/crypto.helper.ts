import env from "@/constants/env"
import crypto from "crypto"

export default {
  randomBytes() {
    return crypto.randomBytes(32).toString("hex")
  },
  sign(data: string) {
    return crypto.createHash('sha256').update(`${data}_${env.dbDatabase}`).digest('hex')
  },
  verify(data: string, signature: string) {
    return this.sign(data) === signature
  },
}