import { NameValidatorZod } from '@root';

export class NameValidatorFactoryZod {
  static create() {
    return new NameValidatorZod();
  }
}

export default NameValidatorFactoryZod;
