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
    return validationErrors => {
      const result = {}

      validationErrors?.forEach(error => {
        const { property, constraints, children } = error

        if (constraints) result[property] = Object.values(constraints).reverse()

        children?.length && children.forEach(child => {
          if (child.constraints) result[`${property}.${child.property}`] = Object.values(child.constraints).reverse()
        })
      })

      return new UnprocessableEntityException({
        message: 'Validation failed',
        errors: result,
      })
    }
  }
}