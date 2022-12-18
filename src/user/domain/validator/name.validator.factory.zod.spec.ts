import { NameValidatorFactoryZod, NameValidatorZod } from '@root';

describe('NameValidatorFactoryZod', () => {
  it('should create a validator of roles', () => {
    const validator = NameValidatorFactoryZod.create();
    expect(validator).toBeInstanceOf(NameValidatorZod);
  });
});
