import { BlankEntity } from "./blank.entity"
import { User } from "@/app/domain/system/user/entities/user.entity"
import { Expose } from "class-transformer"
import { Column, CreateDateColumn, ManyToOne, UpdateDateColumn } from "typeorm"

export const timestampColumn = {
  created_by_id: 'created_by_id',
  updated_by_id: 'updated_by_id',
  created_at: 'created_at',
  updated_at: 'updated_at',
}

export function WithTimestamp<T extends new (...args: any[]) => {}>(Base = BlankEntity as T) {
  abstract class TimestampMixin extends Base {
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
  return TimestampMixin
}