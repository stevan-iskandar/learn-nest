import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator"

export const Confirmed = (field: string, validationOptions?: ValidationOptions) => {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'confirmed',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [field],
      options: validationOptions,
      validator: {
        validate: (value: any, args: ValidationArguments) => {
          const field: string = args.constraints[0]
          if (value !== args.object[field]) return false

          return true
        },

        defaultMessage: (args: ValidationArguments) => {
          return `The ${args.property} confirmation does not match.`
        },
      },
    })
  }
}