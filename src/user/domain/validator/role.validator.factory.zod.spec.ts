import { RoleValidatorFactoryZod, RoleValidatorZod } from '@root';

describe('RoleValidatorFactoryZod', () => {
  it('should create a validator of roles', () => {
    const validator = RoleValidatorFactoryZod.create();
    expect(validator).toBeInstanceOf(RoleValidatorZod);
  });
});
