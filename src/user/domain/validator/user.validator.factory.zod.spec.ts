import { UserValidatorFactoryZod, UserValidatorZod } from '@root';

describe('UserValidatorFactoryZod', () => {
  it('should create a validator of users', () => {
    const validator = UserValidatorFactoryZod.create();
    expect(validator).toBeInstanceOf(UserValidatorZod);
  });
});
