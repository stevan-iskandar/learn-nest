import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator"

export const Required = (validationOptions?: ValidationOptions) => {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'required',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate: (value: any, args: ValidationArguments) => {
          return !!value
        },

        defaultMessage: (args: ValidationArguments) => {
          return `The ${args.property} field is required.`
        },
      },
    })
  }
}