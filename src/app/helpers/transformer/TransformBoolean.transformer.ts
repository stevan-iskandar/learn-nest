import { Transform, TransformFnParams } from "class-transformer"

export function TransformBoolean() {
  const toPlain = Transform(
    ({ value }: TransformFnParams & { value?: boolean | string | null }) => {
      if (typeof value === 'boolean') return value ? 1 : 0
      return value
    },
    { toPlainOnly: true },
  )

  const toClass = Transform(
    ({ value }: TransformFnParams & { value?: boolean | string | null }) => {
      if (typeof value === 'string') return value === '1'
      return value
    },
    { toClassOnly: true },
  )

  return (target: any, key: string): void => {
    toPlain(target, key)
    toClass(target, key)
  }
}
