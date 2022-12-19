import { NameValueObject } from '#user-manager';

describe('NameValueObject', () => {
  it('should create a valid name', () => {
    const name = new NameValueObject({ firstName: 'John', lastName: 'Doe' });

    expect(name.firstName).toBe('John');
    expect(name.lastName).toBe('Doe');
    expect(name.fullName).toBe('John Doe');
  });

  it('should not create a valid name', () => {
    expect(
      () => new NameValueObject({ firstName: '', lastName: 'Doe' })
    ).toThrow();
  });
});
