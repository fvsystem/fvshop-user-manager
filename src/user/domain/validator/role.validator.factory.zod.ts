import { RoleValidatorZod } from '@root';

export class RoleValidatorFactoryZod {
  static create() {
    return new RoleValidatorZod();
  }
}

export default RoleValidatorFactoryZod;
