import { UserValidatorZod } from '@root';

export class UserValidatorFactoryZod {
  static create() {
    return new UserValidatorZod();
  }
}

export default UserValidatorFactoryZod;
