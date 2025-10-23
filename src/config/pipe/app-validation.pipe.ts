import { UnprocessableEntityException, ValidationError, ValidationPipe } from "@nestjs/common"

export class AppValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
      transformOptions: { enableImplicitConversion: true },
    })
  }

  createExceptionFactory(): (validationErrors?: ValidationError[]) => unknown {
    const parseErrorMessage = (error: ValidationError) => {
      const { property, children, constraints, contexts, target, value } = error

      const parseErrorType = (type: string) => {
        if (!constraints) return

        switch (type) {
          case 'isNotEmpty':
            return `The ${property} field is required.`
          case 'isEmail':
            return `The ${property} must be a valid email address.`
          default:
            return constraints[type]
        }
      }

      return constraints
        ? Object.keys(constraints).map(type => parseErrorType(type)).reverse()
        : []
    }

    return validationErrors => {
      const result = validationErrors?.reduce((result, error) => {
        const process = (error: ValidationError, path: string = '') => {
          const currentPath = path ? `${path}.${error.property}` : error.property

          if (error.constraints) {
            result[currentPath] = parseErrorMessage(error)
          }

          error.children?.forEach(child => process(child, currentPath))
        }

        process(error)
        return result
      }, {}) || {}

      return new UnprocessableEntityException({
        message: 'Validation failed',
        errors: result,
      })
    }
  }
}