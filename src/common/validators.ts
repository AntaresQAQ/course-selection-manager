import { registerDecorator, ValidationOptions } from 'class-validator';

export function If<T>(
  callback: (value: T) => boolean,
  validationOptions?: ValidationOptions,
) {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: T) {
          return callback(value);
        },
      },
    });
  };
}

export function IsPortNumber(validationOptions?: ValidationOptions) {
  return If(
    (value) => Number.isInteger(value) && value >= 1 && value <= 65535,
    validationOptions,
  );
}
