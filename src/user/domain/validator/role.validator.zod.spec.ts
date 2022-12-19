import { RoleValidatorZod } from '@root';

describe('RoleValidator', () => {
  it('should validate a valid role', async () => {
    const role = { name: 'Admin' };
    const validator = new RoleValidatorZod();
    const result = await validator.validate(role);
    expect(result).toBeTruthy();
    expect(validator.validatedData).toEqual(role);
  });

  it('should not validate an invalid role', async () => {
    const role = { name: 'A' };
    const validator = new RoleValidatorZod();
    const result = await validator.validate(role);
    expect(result).toBeFalsy();
    expect(validator.validatedData).toEqual(null);
    expect(validator.errors).toStrictEqual({
      name: ['String must contain at least 3 character(s)'],
    });
  });
});
