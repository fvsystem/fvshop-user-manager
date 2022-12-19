import { NameValidatorZod } from '#user-manager';

export class NameValidatorFactoryZod {
  static create() {
    return new NameValidatorZod();
  }
}

export default NameValidatorFactoryZod;
