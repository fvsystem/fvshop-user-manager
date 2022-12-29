import { RoleValidatorZod } from './role.validator.zod';

export class RoleValidatorFactoryZod {
  static create() {
    return new RoleValidatorZod();
  }
}

export default RoleValidatorFactoryZod;
