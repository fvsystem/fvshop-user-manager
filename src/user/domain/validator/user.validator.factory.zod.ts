import { UserValidatorZod } from '@user-manager';

export class UserValidatorFactoryZod {
  static create() {
    return new UserValidatorZod();
  }
}

export default UserValidatorFactoryZod;
