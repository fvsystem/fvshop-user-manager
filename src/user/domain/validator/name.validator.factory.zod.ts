import { NameValidatorZod } from './name.validator.zod';

export class NameValidatorFactoryZod {
  static create() {
    return new NameValidatorZod();
  }
}
