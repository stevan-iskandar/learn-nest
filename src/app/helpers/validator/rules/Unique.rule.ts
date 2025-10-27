import hashidsHelper from "../../hashids.helper"
import { RequestContext } from "@/app/context/request.context"
import databaseSourceConfig from "@/config/database-source.config"
import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator"
import { EntityTarget, FindOptionsWhere, ILike, Not, ObjectLiteral } from "typeorm"

interface UniqueOptions {
  excludeSelf?: boolean
  params?: string
  isHashId?: boolean
}

export function Unique<Entity extends ObjectLiteral>(entity: EntityTarget<Entity>, column: keyof Entity, options?: UniqueOptions, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'unique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [entity, column, options],
      options: validationOptions,
      async: true,
      validator: {
        validate: async (value: any, args: ValidationArguments) => {
          try {
            const entity: EntityTarget<Entity> = args.constraints[0]
            const column: keyof Entity = args.constraints[1]
            const options: UniqueOptions | undefined = args.constraints[2]
            const where = {
              [column]: ILike(value),
            } as FindOptionsWhere<Entity>

            if (options?.excludeSelf) {
              const req = RequestContext.getCurrentRequest()
              const paramsId = req!.params[options.params ?? 'id']
              const value = options.isHashId === false
                ? parseInt(paramsId)
                : hashidsHelper.decode(paramsId)
                ; (where as any).id = Not(value)
            }

            const data = await databaseSourceConfig.getRepository(entity).findOne({
              where,
              withDeleted: true,
            })

            return !data
          } catch (error) {
            console.error('Unique validation error:', error)
            return true
          }
        },

        defaultMessage: (args: ValidationArguments) => {
          return `The ${args.property} has already been taken.`
        },
      },
    })
  }
}