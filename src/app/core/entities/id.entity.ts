import { BlankEntity } from "./blank.entity"
import hashidsHelper from "@/app/helpers/hashids.helper"
import { Expose } from "class-transformer"
import { AfterInsert, AfterLoad, AfterUpdate, PrimaryGeneratedColumn } from "typeorm"

export const idColumn = {
  id: 'id',
  encryption_id: 'encryption_id',
}

export function WithId<T extends new (...args: any[]) => {}>(Base = BlankEntity as T) {
  abstract class IdMixin extends Base {
    @Expose()
    @PrimaryGeneratedColumn({
      type: 'bigint',
      unsigned: true,
    })
    id: number

    @AfterLoad()
    @AfterInsert()
    @AfterUpdate()
    convertIdToNumber() {
      if (this.id && typeof this.id === 'string')
        this.id = parseInt(this.id, 10)
    }

    @AfterLoad()
    @AfterInsert()
    @AfterUpdate()
    encryptId() {
      this[idColumn.encryption_id] = hashidsHelper.encode(this.id)
    }
  }
  return IdMixin
}