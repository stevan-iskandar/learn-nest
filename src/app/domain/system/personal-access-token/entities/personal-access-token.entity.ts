import { User } from "../../user/entities/user.entity"
import { idColumn, WithId } from "@/app/core/entities/id.entity"
import { timestampColumn, WithTimestamp } from "@/app/core/entities/timestamp.entity"
import { Expose } from "class-transformer"
import { Column, Entity, ManyToOne } from "typeorm"

export const personalAccessTokenTable = 'personal_access_tokens'
export const personalAccessTokenColumn = {
  ...idColumn,
  user_id: 'user_id',
  name: 'name',
  token: 'token',
  abilities: 'abilities',
  last_used_at: 'last_used_at',
  expired_at: 'expired_at',
  ...timestampColumn,
}

@Entity(personalAccessTokenTable)
export class PersonalAccessToken extends WithTimestamp(WithId()) {
  @Expose()
  @Column()
  user_id: number

  @Expose()
  @ManyToOne(() => User)
  user?: User

  @Expose()
  @Column()
  name: string

  @Expose()
  @Column()
  token: string

  @Expose()
  @Column('json', { array: true })
  abilities: string[]

  @Expose()
  @Column()
  last_used_at?: Date

  @Expose()
  @Column()
  expired_at: Date
}