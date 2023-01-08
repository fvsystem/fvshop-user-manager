import request from 'supertest';
import {
  NameValueObject,
  RoleEntity,
  UserEntityFactory,
} from '@root/user/domain';
import {
  getAppSequelize,
  RoleMapper,
  RoleModelSequelize,
  RoleRepositorySequelize,
  UserMapper,
  UserModelSequelize,
  UserRepositorySequelize,
} from '../../sequelize';
import { getAppExpress } from '../../express';

describe('E2E express-sequelize', () => {
  it('should find by email', async () => {
    const config = {
      db: {
        vendor: 'sqlite',
        host: ':memory:',
        logging: false,
      },
      rest: {},
      jwt: {
        publicKey: 'publicKey',
      },
    };
    await getAppSequelize(config);
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

    const app = getAppExpress(userRepository);

    const response = await request(app)
      .get('/user/mail')
      .query({ email: 'test@test.com' });

    expect(response.status).toBe(200);
    expect(response.body.user).toEqual({
      id: user.id,
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      email: 'test@test.com',
      roles: ['admin', 'user'],
    });

    await UserModelSequelize.sequelize.close();
  });

  it('should find by id', async () => {
    const config = {
      db: {
        vendor: 'sqlite',
        host: ':memory:',
        logging: false,
      },
      rest: {},
      jwt: {
        publicKey: 'publicKey',
      },
    };
    await getAppSequelize(config);
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

    const app = getAppExpress(userRepository);

    const response = await request(app).get(`/user/${user.id}`);

    expect(response.status).toBe(200);
    expect(response.body.user).toEqual({
      id: user.id,
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      email: 'test@test.com',
      roles: ['admin', 'user'],
    });

    await UserModelSequelize.sequelize.close();
  });
});
