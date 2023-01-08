import {
  NotFoundError,
  UniqueEntityId,
} from '@fvsystem/fvshop-shared-entities';
import {
  NameValueObject,
  RoleEntity,
  UserEntityFactory,
} from '@root/user/domain';
import { setupSequelize } from '../../testing';
import { RoleUserModelSequelize } from './role-user.model.sequelize';
import { RoleMapper } from './role.mapper.sequelize';
import { RoleModelSequelize } from './role.model.sequelize';
import { RoleRepositorySequelize } from './role.repository.sequelize';
import { UserMapper } from './user.mapper.sequelize';
import { UserModelSequelize } from './user.model.sequelize';
import { UserRepositorySequelize } from './user.repository.sequelize';

describe('SequelizeRepository', () => {
  setupSequelize({
    models: [UserModelSequelize, RoleModelSequelize, RoleUserModelSequelize],
  });

  it('should insert user and role', async () => {
    const role = new RoleEntity({ name: 'admin' });
    const role2 = new RoleEntity({ name: 'user' });
    const name = new NameValueObject({
      firstName: 'John',
      lastName: 'Doe',
    });
    const user = await UserEntityFactory.create({
      email: 'test@test.com',
      roles: [role, role2],
      name,
    });
    const roleRepository = new RoleRepositorySequelize(
      RoleModelSequelize,
      RoleMapper.mapToEntity,
      RoleMapper.mapToModel
    );

    await roleRepository.insert(role);
    await roleRepository.insert(role2);

    const userRepository = new UserRepositorySequelize(
      UserModelSequelize,
      UserMapper.mapToEntity,
      UserMapper.mapToModel
    );
    await userRepository.insert(user);

    const userFound = await userRepository.findById(user.id);

    expect(userFound.id).toBe(user.id);
    expect(userFound.email).toBe(user.email);
    expect(userFound.name.firstName).toBe(user.name.firstName);
    expect(userFound.name.lastName).toBe(user.name.lastName);
    expect(
      userFound.roles.map((item) => item.name).includes(user.roles[0].name)
    ).toBe(true);
    expect(
      userFound.roles.map((item) => item.name).includes(user.roles[1].name)
    ).toBe(true);
    const roleFound = await roleRepository.findById(role.id);
    expect(roleFound.id).toBe(role.id);
    expect(roleFound.name).toBe(role.name);
  });

  it('should throw error on getting roles and user by id when role or user does not exist', async () => {
    const roleRepository = new RoleRepositorySequelize(
      RoleModelSequelize,
      RoleMapper.mapToEntity,
      RoleMapper.mapToModel
    );

    const userRepository = new UserRepositorySequelize(
      UserModelSequelize,
      UserMapper.mapToEntity,
      UserMapper.mapToModel
    );

    await expect(() => roleRepository.getUsers('role.id')).rejects.toThrowError(
      NotFoundError
    );

    await expect(() => userRepository.getRoles('user.id')).rejects.toThrowError(
      NotFoundError
    );
  });

  it('should get roles and users by id', async () => {
    const role = new RoleEntity({ name: 'admin' });
    const role2 = new RoleEntity({ name: 'user' });
    const name = new NameValueObject({
      firstName: 'John',
      lastName: 'Doe',
    });
    const user = await UserEntityFactory.create({
      email: 'test@test.com',
      roles: [role, role2],
      name,
    });
    const roleRepository = new RoleRepositorySequelize(
      RoleModelSequelize,
      RoleMapper.mapToEntity,
      RoleMapper.mapToModel
    );

    await roleRepository.insert(role);
    await roleRepository.insert(role2);

    const userRepository = new UserRepositorySequelize(
      UserModelSequelize,
      UserMapper.mapToEntity,
      UserMapper.mapToModel
    );
    await userRepository.insert(user);

    const [userFound] = await roleRepository.getUsers(role.id);

    expect(userFound.id).toBe(user.id);
    expect(userFound.email).toBe(user.email);
    expect(userFound.name.firstName).toBe(user.name.firstName);
    expect(userFound.name.lastName).toBe(user.name.lastName);
    expect(
      userFound.roles.map((item) => item.name).includes(user.roles[0].name)
    ).toBe(true);
    expect(
      userFound.roles.map((item) => item.name).includes(user.roles[1].name)
    ).toBe(true);
    const [roleFound1, roleFound2] = await userRepository.getRoles(user.id);

    expect(user.roles.map((item) => item.name).includes(roleFound1.name)).toBe(
      true
    );

    expect(user.roles.map((item) => item.name).includes(roleFound2.name)).toBe(
      true
    );

    user.removeRole(role);
    user.removeRole(role2);
    await userRepository.update(user);

    const [userFound2] = await roleRepository.getUsers(role.id);

    expect(userFound2).toBeUndefined();

    const [roleFound] = await userRepository.getRoles(user.id);
    expect(roleFound).toBeUndefined();
  });

  it('should find by email', async () => {
    const role = new RoleEntity({ name: 'admin' });
    const role2 = new RoleEntity({ name: 'user' });
    const name = new NameValueObject({
      firstName: 'John',
      lastName: 'Doe',
    });
    const user = await UserEntityFactory.create({
      email: 'test@test.com',
      roles: [role, role2],
      name,
    });
    const roleRepository = new RoleRepositorySequelize(
      RoleModelSequelize,
      RoleMapper.mapToEntity,
      RoleMapper.mapToModel
    );

    await roleRepository.insert(role);
    await roleRepository.insert(role2);

    const userRepository = new UserRepositorySequelize(
      UserModelSequelize,
      UserMapper.mapToEntity,
      UserMapper.mapToModel
    );
    await userRepository.insert(user);

    const userFound = await userRepository.findByEmail(user.email);

    expect(userFound.id).toBe(user.id);
    expect(userFound.email).toBe(user.email);
    expect(userFound.name.firstName).toBe(user.name.firstName);
    expect(userFound.name.lastName).toBe(user.name.lastName);
    expect(
      userFound.roles.map((item) => item.name).includes(user.roles[0].name)
    ).toBe(true);
    expect(
      userFound.roles.map((item) => item.name).includes(user.roles[1].name)
    ).toBe(true);
  });

  it('should throw error when email does not exist', async () => {
    const userRepository = new UserRepositorySequelize(
      UserModelSequelize,
      UserMapper.mapToEntity,
      UserMapper.mapToModel
    );

    await expect(() =>
      userRepository.findByEmail('test@teste.com')
    ).rejects.toThrowError(NotFoundError);
  });

  it('should find role by name', async () => {
    const role = new RoleEntity({ name: 'admin' });
    const roleRepository = new RoleRepositorySequelize(
      RoleModelSequelize,
      RoleMapper.mapToEntity,
      RoleMapper.mapToModel
    );

    await roleRepository.insert(role);

    const roleFound = await roleRepository.findByName(role.name);

    expect(roleFound.id).toBe(role.id);
    expect(roleFound.name).toBe(role.name);
  });

  it('should throw error when name does not exist', async () => {
    const roleRepository = new RoleRepositorySequelize(
      RoleModelSequelize,
      RoleMapper.mapToEntity,
      RoleMapper.mapToModel
    );

    await expect(() => roleRepository.findByName('name')).rejects.toThrowError(
      NotFoundError
    );
  });

  it('should  bulk insert', async () => {
    const role = new RoleEntity({ name: 'admin' });
    const role2 = new RoleEntity({ name: 'user' });
    const name = new NameValueObject({
      firstName: 'John',
      lastName: 'Doe',
    });
    const user = await UserEntityFactory.create({
      email: 'test@test.com',
      roles: [role, role2],
      name,
    });

    const user2 = await UserEntityFactory.create({
      email: 'test2@test.com',
      roles: [role],
      name,
    });
    const roleRepository = new RoleRepositorySequelize(
      RoleModelSequelize,
      RoleMapper.mapToEntity,
      RoleMapper.mapToModel
    );

    await roleRepository.bulkInsert([role, role2]);

    const userRepository = new UserRepositorySequelize(
      UserModelSequelize,
      UserMapper.mapToEntity,
      UserMapper.mapToModel
    );
    await userRepository.bulkInsert([user, user2]);

    const usersFound = await userRepository.findAll();

    const userItem = usersFound.findIndex((item) => item.id === user.id);
    const user2Item = usersFound.findIndex((item) => item.id === user2.id);

    expect(usersFound[userItem].id).toBe(user.id);
    expect(usersFound[userItem].email).toBe(user.email);
    expect(usersFound[userItem].name.firstName).toBe(user.name.firstName);
    expect(usersFound[userItem].name.lastName).toBe(user.name.lastName);
    expect(
      usersFound[userItem].roles
        .map((item) => item.name)
        .includes(user.roles[0].name)
    ).toBe(true);
    expect(
      usersFound[userItem].roles
        .map((item) => item.name)
        .includes(user.roles[1].name)
    ).toBe(true);

    expect(usersFound[user2Item].id).toBe(user2.id);
    expect(usersFound[user2Item].email).toBe(user2.email);
    expect(usersFound[user2Item].name.firstName).toBe(user2.name.firstName);
    expect(usersFound[user2Item].name.lastName).toBe(user2.name.lastName);
    expect(
      usersFound[user2Item].roles
        .map((item) => item.name)
        .includes(user.roles[0].name)
    ).toBe(true);
    expect(usersFound[user2Item].roles[1]).toBeUndefined();

    const rolesFound = await roleRepository.findAll();

    expect(rolesFound.map((item) => item.id).includes(role.id)).toBe(true);

    expect(rolesFound.map((item) => item.id).includes(role2.id)).toBe(true);
  });

  it('should update user', async () => {
    const role = new RoleEntity({ name: 'admin' });
    const role2 = new RoleEntity({ name: 'user' });
    const role3 = new RoleEntity({ name: 'sales' });

    const name = new NameValueObject({
      firstName: 'John',
      lastName: 'Doe',
    });
    const user = await UserEntityFactory.create({
      email: 'test@test.com',
      roles: [role, role2],
      name,
    });
    const roleRepository = new RoleRepositorySequelize(
      RoleModelSequelize,
      RoleMapper.mapToEntity,
      RoleMapper.mapToModel
    );

    await roleRepository.bulkInsert([role, role2, role3]);

    const userRepository = new UserRepositorySequelize(
      UserModelSequelize,
      UserMapper.mapToEntity,
      UserMapper.mapToModel
    );
    await userRepository.insert(user);

    user.email = 'test2@test.com';

    user.removeRole(role2);

    user.addRole(role3);

    await userRepository.update(user);

    const userFound = await userRepository.findById(user.id);

    expect(userFound.id).toBe(user.id);
    expect(userFound.email).toBe(user.email);
    expect(userFound.name.firstName).toBe(user.name.firstName);
    expect(userFound.name.lastName).toBe(user.name.lastName);
    expect(
      userFound.roles.map((item) => item.name).includes(user.roles[0].name)
    ).toBe(true);
    expect(
      userFound.roles.map((item) => item.name).includes(user.roles[1].name)
    ).toBe(true);
  });

  it('should update role', async () => {
    const role = new RoleEntity({ name: 'admin' });
    const role2 = new RoleEntity({ name: 'user' });
    const role3 = new RoleEntity({ name: 'sales' });

    const roleRepository = new RoleRepositorySequelize(
      RoleModelSequelize,
      RoleMapper.mapToEntity,
      RoleMapper.mapToModel
    );

    await roleRepository.bulkInsert([role, role2, role3]);

    role.name = 'admin2';

    await roleRepository.update(role);

    const roleFound = await roleRepository.findById(role.id);

    expect(roleFound.id).toBe(role.id);
  });

  it('should not update inexistent role', async () => {
    const role = new RoleEntity({ name: 'admin' });

    const roleRepository = new RoleRepositorySequelize(
      RoleModelSequelize,
      RoleMapper.mapToEntity,
      RoleMapper.mapToModel
    );

    await expect(() => roleRepository.update(role)).rejects.toThrow(
      NotFoundError
    );
  });

  it('should not update inexistent user', async () => {
    const role = new RoleEntity({ name: 'admin' });
    const role2 = new RoleEntity({ name: 'user' });

    const name = new NameValueObject({
      firstName: 'John',
      lastName: 'Doe',
    });
    const user = await UserEntityFactory.create({
      email: 'test@test.com',
      roles: [role, role2],
      name,
    });

    const userRepository = new UserRepositorySequelize(
      UserModelSequelize,
      UserMapper.mapToEntity,
      UserMapper.mapToModel
    );

    await expect(() => userRepository.update(user)).rejects.toThrow(
      NotFoundError
    );
  });

  it('should not delete inexistent user', async () => {
    const userRepository = new UserRepositorySequelize(
      UserModelSequelize,
      UserMapper.mapToEntity,
      UserMapper.mapToModel
    );
    await expect(() => userRepository.delete('4343')).rejects.toThrow(
      NotFoundError
    );
  });

  it('should not delete inexistent role', async () => {
    const roleRepository = new RoleRepositorySequelize(
      RoleModelSequelize,
      RoleMapper.mapToEntity,
      RoleMapper.mapToModel
    );

    await expect(() => roleRepository.delete('4343')).rejects.toThrow(
      NotFoundError
    );
  });

  it('should delete user', async () => {
    const role = new RoleEntity({ name: 'admin' });
    const role2 = new RoleEntity({ name: 'user' });
    const role3 = new RoleEntity({ name: 'sales' });

    const name = new NameValueObject({
      firstName: 'John',
      lastName: 'Doe',
    });
    const user = await UserEntityFactory.create({
      email: 'test@test.com',
      roles: [role, role2],
      name,
    });
    const roleRepository = new RoleRepositorySequelize(
      RoleModelSequelize,
      RoleMapper.mapToEntity,
      RoleMapper.mapToModel
    );

    await roleRepository.bulkInsert([role, role2, role3]);

    const userRepository = new UserRepositorySequelize(
      UserModelSequelize,
      UserMapper.mapToEntity,
      UserMapper.mapToModel
    );
    await userRepository.insert(user);

    const userFound = await userRepository.findById(user.id);

    expect(userFound.id).toBe(user.id);
    expect(userFound.email).toBe(user.email);
    expect(userFound.name.firstName).toBe(user.name.firstName);
    expect(userFound.name.lastName).toBe(user.name.lastName);
    expect(
      userFound.roles.map((item) => item.name).includes(user.roles[0].name)
    ).toBe(true);
    expect(
      userFound.roles.map((item) => item.name).includes(user.roles[1].name)
    ).toBe(true);
    await userRepository.delete(user.id);

    await expect(() => userRepository.findById(user.id)).rejects.toThrow(
      NotFoundError
    );
  });

  it('should delete role', async () => {
    const role = new RoleEntity({ name: 'admin' });
    const role2 = new RoleEntity({ name: 'user' });
    const role3 = new RoleEntity({ name: 'sales' });

    const id = new UniqueEntityId(role2.id);

    const roleRepository = new RoleRepositorySequelize(
      RoleModelSequelize,
      RoleMapper.mapToEntity,
      RoleMapper.mapToModel
    );

    await roleRepository.bulkInsert([role, role2, role3]);

    await roleRepository.delete(role.id);

    await roleRepository.delete(id);

    await expect(() => roleRepository.findById(role.id)).rejects.toThrow(
      NotFoundError
    );

    await expect(() => roleRepository.findById(role2.id)).rejects.toThrow(
      NotFoundError
    );
  });
});
