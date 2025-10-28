import { idColumn, WithId } from "@/app/core/entities/id.entity"
import { softDeleteColumn, WithSoftDelete } from "@/app/core/entities/softdelete.entity"
import { Exclude, Expose } from "class-transformer"
import { Column, CreateDateColumn, Entity, ManyToOne, UpdateDateColumn } from "typeorm"

export const userTable = 'users'
export const userColumn = {
  ...idColumn,
  first_name: 'first_name',
  last_name: 'last_name',
  username: 'username',
  email: 'email',
  password: 'password',
  age: 'age',
  active: 'active',
  created_by_id: 'created_by_id',
  updated_by_id: 'updated_by_id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  ...softDeleteColumn,
}

@Entity(userTable)
export class User extends WithSoftDelete(WithId()) {
  @Expose()
  @Column()
  first_name: string

  @Expose()
  @Column()
  last_name: string

  @Expose()
  @Column()
  username: string

  @Expose()
  @Column()
  email: string

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string

  @Expose()
  @Column()
  age: number

  @Expose()
  @Column({ default: true })
  active: boolean
  @Expose()
  @Column({
    type: 'bigint',
    nullable: true,
    unsigned: true,
  })
  created_by_id?: number

  @Expose()
  @ManyToOne(() => User)
  created_by?: User

  @Expose()
  @Column({
    type: 'bigint',
    nullable: true,
    unsigned: true,
  })
  updated_by_id?: number

  @Expose()
  @ManyToOne(() => User)
  updated_by?: User

  @Expose()
  @CreateDateColumn({
    type: 'timestamptz',
  })
  created_at: Date

  @Expose()
  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updated_at: Date
}
