import { Transform } from "class-transformer"
import dayjs, { Dayjs } from "dayjs"

export function TransformDayjs() {
  const toPlain = Transform(
    ({ value }: { value?: Dayjs | string | null }) => {
      if (dayjs.isDayjs(value)) return value.format()

      return value
    },
    { toPlainOnly: true },
  )

  const toClass = Transform(
    ({ value }: { value?: Dayjs | string | null }) => {
      if (typeof value === 'string') return dayjs(value)

      return value
    },
    { toClassOnly: true },
  )

  return (target: any, key: string): void => {
    toPlain(target, key)
    toClass(target, key)
  }
}
