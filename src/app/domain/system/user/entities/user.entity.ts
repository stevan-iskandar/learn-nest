import { idColumn, WithId } from "@/app/core/entities/id.entity"
import { softDeleteColumn, WithSoftDelete } from "@/app/core/entities/softdelete.entity"
import { timestampColumn, WithTimestamp } from "@/app/core/entities/timestamp.entity"
import { Expose } from "class-transformer"
import { Column, Entity } from "typeorm"

export const userTable = 'users'
export const userColumn = {
  ...idColumn,
  first_name: 'first_name',
  last_name: 'last_name',
  active: 'active',
  ...timestampColumn,
  ...softDeleteColumn,
}

@Entity()
export class User extends WithSoftDelete(WithTimestamp(WithId())) {
  @Expose()
  @Column()
  first_name: string

  @Expose()
  @Column()
  last_name: string

  @Expose()
  @Column({ default: true })
  active: boolean
}
