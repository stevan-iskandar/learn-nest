import { isEmail, registerDecorator, ValidationArguments, ValidationOptions } from "class-validator"
import { IsEmailOptions } from "validator"

export function Email(options?: IsEmailOptions, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'email',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [options],
      options: validationOptions,
      validator: {
        validate: (value: any, args: ValidationArguments) => isEmail(
          value,
          args === null || args === void 0 ? void 0 : args.constraints[0],
        ),

        defaultMessage: (args: ValidationArguments) => {
          return `The ${args.property} must be a valid email address.`
        },
      },
    })
  }
}