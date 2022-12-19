import { UserValidatorZod } from '@root';

describe('UserValidator', () => {
  it('should validate a valid user', async () => {
    const user = { email: 'test@test.com' };
    const validator = new UserValidatorZod();
    const result = await validator.validate(user);
    expect(result).toBeTruthy();
    expect(validator.validatedData).toEqual(user);
  });

  it('should not validate an invalid role', async () => {
    const user = { email: 'A' };
    const validator = new UserValidatorZod();
    const result = await validator.validate(user);
    expect(result).toBeFalsy();
    expect(validator.validatedData).toEqual(null);
    expect(validator.errors).toBeTruthy();
  });
});
