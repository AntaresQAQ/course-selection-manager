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

export function isUsername(str: string) {
  return /^[a-zA-Z0-9\-_.#$]{3,24}$/.test(str);
}

export function IsUsername(validationOptions?: ValidationOptions) {
  return If(
    (value) => typeof value === 'string' && isUsername(value),
    validationOptions,
  );
}
