import { UserValidatorZod } from './user.validator.zod';

export class UserValidatorFactoryZod {
  static create() {
    return new UserValidatorZod();
  }
}

export default UserValidatorFactoryZod;
