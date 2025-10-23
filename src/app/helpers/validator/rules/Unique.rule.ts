import databaseSourceConfig from "@/config/database-source.config"
import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator"
import { EntityTarget, FindOptionsWhere, ILike, ObjectLiteral } from "typeorm"

export function Unique<Entity extends ObjectLiteral>(entity: EntityTarget<Entity>, column: keyof Entity, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'unique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [entity, column],
      options: validationOptions,
      async: true,
      validator: {
        validate: async (value: any, args: ValidationArguments) => {
          try {
            const entity: EntityTarget<Entity> = args.constraints[0]
            const column: keyof Entity = args.constraints[1]
            const data = await databaseSourceConfig.getRepository(entity).findOne({
              where: {
                [column]: ILike(value),
              } as FindOptionsWhere<Entity>,
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