import { NameValidatorFactoryZod, NameValidatorZod } from '#user-manager';

describe('NameValidatorFactoryZod', () => {
  it('should create a validator of roles', () => {
    const validator = NameValidatorFactoryZod.create();
    expect(validator).toBeInstanceOf(NameValidatorZod);
  });
});
