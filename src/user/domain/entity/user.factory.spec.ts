import { validate as uuidValidate, v4 as uuid } from 'uuid';
import {
  NameValueObject,
  RoleEntity,
  UserEntity,
  UserEntityFactory,
} from '@root';

describe('UserEntityFactory', () => {
  it('should create an entity of users with uuid when not giving an uuid', () => {
    const name = new NameValueObject({
      firstName: 'John',
      lastName: 'Doe',
    });
    const roles = [
      new RoleEntity({
        name: 'SalesAdministrator',
      }),
    ];
    const email = 'test@test.com';
    const entity = UserEntityFactory.create({
      name,
      roles,
      email,
    });
    expect(entity).toBeInstanceOf(UserEntity);
    expect(entity.name.firstName).toBe('John');
    expect(entity.name.lastName).toBe('Doe');
    expect(entity.name.fullName).toBe('John Doe');
    expect(entity.email).toBe('test@test.com');
    expect(entity.roles[0].name).toBe('SalesAdministrator');
    expect(uuidValidate(entity.id)).toBe(true);
  });

  it('should create an entity of users with uuid giving an uuid', () => {
    const name = new NameValueObject({
      firstName: 'John',
      lastName: 'Doe',
    });
    const roles = [
      new RoleEntity({
        name: 'SalesAdministrator',
      }),
    ];
    const email = 'test@test.com';
    const uuidValue = uuid();

    const entity = UserEntityFactory.create(
      {
        name,
        roles,
        email,
      },
      uuidValue
    );
    expect(entity).toBeInstanceOf(UserEntity);
    expect(entity.name.firstName).toBe('John');
    expect(entity.name.lastName).toBe('Doe');
    expect(entity.name.fullName).toBe('John Doe');
    expect(entity.email).toBe('test@test.com');
    expect(entity.roles[0].name).toBe('SalesAdministrator');
    expect(entity.id).toBe(uuidValue);
  });

  it('should create an entity of users with invalid uuid', () => {
    const name = new NameValueObject({
      firstName: 'John',
      lastName: 'Doe',
    });
    const roles = [
      new RoleEntity({
        name: 'SalesAdministrator',
      }),
    ];
    const email = 'test@test.com';
    const uuidValue = 'invalidUUID';

    expect(() =>
      UserEntityFactory.create(
        {
          name,
          roles,
          email,
        },
        uuidValue
      )
    ).toThrow();
  });

  it('should create an entity of users with invalid email', () => {
    const name = new NameValueObject({
      firstName: 'John',
      lastName: 'Doe',
    });
    const roles = [
      new RoleEntity({
        name: 'SalesAdministrator',
      }),
    ];
    const email = 'a';
    const uuidValue = uuid();

    expect(() =>
      UserEntityFactory.create(
        {
          name,
          roles,
          email,
        },
        uuidValue
      )
    ).toThrow();
  });
});
