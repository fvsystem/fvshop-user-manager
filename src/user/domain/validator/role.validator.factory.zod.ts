import { RoleValidatorZod } from '@user-manager';

export class RoleValidatorFactoryZod {
  static create() {
    return new RoleValidatorZod();
  }
}

export default RoleValidatorFactoryZod;
