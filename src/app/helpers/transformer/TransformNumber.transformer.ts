import { Transform } from "class-transformer"

export function TransformNumber() {
  const toPlain = Transform(
    ({ value }: { value?: number | string | null }) => value,
    { toPlainOnly: true },
  )

  const toClass = Transform(
    ({ value }: { value?: number | string | null }) => {
      if (typeof value === 'string') return parseInt(value)

      return value
    },
    { toClassOnly: true },
  )

  return (target: any, key: string): void => {
    toPlain(target, key)
    toClass(target, key)
  }
}
