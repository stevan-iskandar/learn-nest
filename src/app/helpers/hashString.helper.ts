import env from "@/constants/env"
import bcrypt from "bcrypt"

export default (string: string) => {
  const salt = bcrypt.genSaltSync(env.bcryptRound)
  return bcrypt.hashSync(string, salt)
}