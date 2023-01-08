import { EntityValidationError } from '@fvsystem/fvshop-shared-entities';
import { NameValueObject, RoleEntity, UserEntity } from '@root';

describe('UserEntity', () => {
  it('should create a valid user', () => {
    const user = new UserEntity({
      name: new NameValueObject({ firstName: 'John', lastName: 'Doe' }),
      email: 'test@test.com',
      roles: [new RoleEntity({ name: 'SalesAdministrator' })],
    });
    expect(user.name.firstName).toBe('John');
    expect(user.name.lastName).toBe('Doe');
    expect(user.name.fullName).toBe('John Doe');
    expect(user.email).toBe('test@test.com');
    expect(user.roles[0].name).toBe('SalesAdministrator');
  });

  it('should change  user', () => {
    const user = new UserEntity({
      name: new NameValueObject({ firstName: 'John', lastName: 'Doe' }),
      email: 'test@test.com',
      roles: [new RoleEntity({ name: 'SalesAdministrator' })],
    });
    expect(user.name.firstName).toBe('John');
    expect(user.name.lastName).toBe('Doe');
    expect(user.name.fullName).toBe('John Doe');
    expect(user.email).toBe('test@test.com');
    expect(user.roles[0].name).toBe('SalesAdministrator');

    user.email = 'test2@test.com';
    expect(user.email).toBe('test2@test.com');

    user.name = new NameValueObject({ firstName: 'Jane', lastName: 'Doe' });

    expect(user.name.firstName).toBe('Jane');
    expect(user.name.lastName).toBe('Doe');

    user.addRole(new RoleEntity({ name: 'Administrator' }));
    expect(user.roles[0].name).toBe('SalesAdministrator');
    expect(user.roles[1].name).toBe('Administrator');

    user.removeRole(user.roles[0]);
    expect(user.roles[0].name).toBe('Administrator');
  });

  it('should validate on change', () => {
    const user = new UserEntity({
      name: new NameValueObject({ firstName: 'John', lastName: 'Doe' }),
      email: 'test@test.com',
      roles: [new RoleEntity({ name: 'SalesAdministrator' })],
    });
    expect(user.name.firstName).toBe('John');
    expect(user.name.lastName).toBe('Doe');
    expect(user.name.fullName).toBe('John Doe');
    expect(user.email).toBe('test@test.com');
    expect(user.roles[0].name).toBe('SalesAdministrator');

    expect(() => {
      user.email = 'fail';
    }).toThrow(EntityValidationError);
  });

  it('should not create a user with invalid name', () => {
    expect(
      () =>
        new UserEntity({
          name: new NameValueObject({ firstName: '', lastName: 'Doe' }),
          email: 'test@test.com',
          roles: [new RoleEntity({ name: 'SalesAdministrator' })],
        })
    ).toThrow();
  });

  it('should not create a user with invalid role', () => {
    expect(
      () =>
        new UserEntity({
          name: new NameValueObject({ firstName: 'John', lastName: 'Doe' }),
          email: 'test@test.com',
          roles: [new RoleEntity({ name: '' })],
        })
    ).toThrow();
  });

  it('should not create a user with invalid email', () => {
    expect(
      () =>
        new UserEntity({
          name: new NameValueObject({ firstName: 'John', lastName: 'Doe' }),
          email: 'asdf',
          roles: [new RoleEntity({ name: 'SalesAdministrator' })],
        })
    ).toThrow();
  });
});
