import { NameValidatorZod } from '@root';

describe('NameValidatorZod', () => {
  it('should validate the name', () => {
    const validator = new NameValidatorZod();
    const result = validator.validate({
      firstName: 'John',
      lastName: 'Doe',
    });
    expect(result).toBeTruthy();
    expect(validator.errors).toBeNull();
    expect(validator.validatedData).toStrictEqual({
      firstName: 'John',
      lastName: 'Doe',
    });
  });

  it('should not validate the name without first name', () => {
    const validator = new NameValidatorZod();
    const result = validator.validate({
      firstName: '',
      lastName: 'Doe',
    });
    expect(result).toBeFalsy();
    expect(validator.errors).toBeTruthy();
    expect(validator.validatedData).toBeNull();
  });

  it('should not validate the name without last name', () => {
    const validator = new NameValidatorZod();
    const result = validator.validate({
      firstName: 'John',
      lastName: '',
    });
    expect(result).toBeFalsy();
    expect(validator.errors).toBeTruthy();
    expect(validator.validatedData).toBeNull();
  });

  it('should not validate the name with too big first Name', () => {
    const validator = new NameValidatorZod();
    const result = validator.validate({
      firstName: '12hfsdkjbfdskjbfdksjfbdksjfbdksjfbdksjfbkjdsbffbdskfbdskjfb',
      lastName: 'Doe',
    });
    expect(result).toBeFalsy();
    expect(validator.errors).toBeTruthy();
    expect(validator.validatedData).toBeNull();
  });

  it('should not validate the name with too big last Name', () => {
    const validator = new NameValidatorZod();
    const result = validator.validate({
      firstName: 'John',
      lastName: '12hfsdkjbfdskjbfdksjfbdksjfbdksjfbdksjfbkjdsbffbdskfbdskjfb',
    });
    expect(result).toBeFalsy();
    expect(validator.errors).toBeTruthy();
    expect(validator.validatedData).toBeNull();
  });

  it('should not validate the name with wrong types', () => {
    const validator = new NameValidatorZod();
    const result = validator.validate({
      firstName: 1,
      lastName: 2,
    });
    expect(result).toBeFalsy();
    expect(validator.errors).toBeTruthy();
    expect(validator.validatedData).toBeNull();
  });
});
