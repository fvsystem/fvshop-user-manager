import { NameValueObject, RoleValueObject, UserEntity } from '#user-manager';

describe('UserEntity', () => {
  it('should create a valid user', () => {
    const user = new UserEntity({
      name: new NameValueObject({ firstName: 'John', lastName: 'Doe' }),
      email: 'test@test.com',
      role: new RoleValueObject({ name: 'SalesAdministrator' }),
    });
    expect(user.name.firstName).toBe('John');
    expect(user.name.lastName).toBe('Doe');
    expect(user.name.fullName).toBe('John Doe');
    expect(user.email).toBe('test@test.com');
    expect(user.role.name).toBe('SalesAdministrator');
  });

  it('should not create a user with invalid name', () => {
    expect(
      () =>
        new UserEntity({
          name: new NameValueObject({ firstName: '', lastName: 'Doe' }),
          email: 'test@test.com',
          role: new RoleValueObject({ name: 'SalesAdministrator' }),
        })
    ).toThrow();
  });

  it('should not create a user with invalid role', () => {
    expect(
      () =>
        new UserEntity({
          name: new NameValueObject({ firstName: 'John', lastName: 'Doe' }),
          email: 'test@test.com',
          role: new RoleValueObject({ name: '' }),
        })
    ).toThrow();
  });

  it('should not create a user with invalid email', () => {
    expect(
      () =>
        new UserEntity({
          name: new NameValueObject({ firstName: 'John', lastName: 'Doe' }),
          email: 'asdf',
          role: new RoleValueObject({ name: 'SalesAdministrator' }),
        })
    ).toThrow();
  });
});
