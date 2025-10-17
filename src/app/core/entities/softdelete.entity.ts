import { BlankEntity } from "./blank.entity"
import { Expose } from "class-transformer"
import { Column } from "typeorm"

export const softDeleteColumn = {
  deleted_at: 'deleted_at',
}

export function WithSoftDelete<T extends new (...args: any[]) => {}>(Base = BlankEntity as T) {
  abstract class SoftDeleteMixin extends Base {
    @Expose()
    @Column({
      type: 'timestamptz',
      nullable: true,
    })
    deleted_at?: Date
  }
  return SoftDeleteMixin
}