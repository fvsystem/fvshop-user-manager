import request from 'supertest';
import { RoleEntity } from '@root/user/domain';
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

const jwtService = {
  sign: jest.fn(),
  verify: jest.fn().mockImplementation(
    (token) =>
      new Promise((resolve, reject) => {
        if (token === 'admin') {
          resolve({
            userId: 'id',
            email: 'test@test.com',
            scope: ['admin'],
          });
        }
        if (token === 'users-admin') {
          resolve({
            userId: 'id',
            email: 'test2@test.com',
            scope: ['users-admin'],
          });
        }
        if (token === 'user') {
          resolve({
            userId: 'id',
            email: 'test3@test.com',
            scope: ['user'],
          });
        }

        if (token === 'user2') {
          resolve({
            userId: 'id',
            email: 'test4@test.com',
            scope: ['user'],
          });
        }
        reject(new Error('Invalid token'));
      })
  ),
};

const credentialFacade = {
  createCredential: {
    execute: jest.fn(),
  },
  verifyCredential: {
    execute: jest.fn(),
  },
};

describe('E2E express-sequelize', () => {
  it('should find by email', async () => {
    const config = {
      nodeEnv: 'test',
      db: {
        vendor: 'sqlite',
        host: ':memory:',
        logging: false,
      },
      grpc: {},
      credentialFacade: {
        domain: 'localhost',
        port: 50051,
      },
      domain: {
        domain: 'localhost',
      },
      rest: {},
      jwt: {
        publicKey: 'publicKey',
      },
    };
    await getAppSequelize(config);

    const userRepository = new UserRepositorySequelize(
      UserModelSequelize,
      UserMapper.mapToEntity,
      UserMapper.mapToModel
    );

    const role = new RoleEntity({ name: 'admin' });
    const role2 = new RoleEntity({ name: 'user' });

    const roleRepository = new RoleRepositorySequelize(
      RoleModelSequelize,
      RoleMapper.mapToEntity,
      RoleMapper.mapToModel
    );

    await roleRepository.insert(role);
    await roleRepository.insert(role2);

    const app = getAppExpress(userRepository, jwtService, credentialFacade);

    const responseCreation = await request(app)
      .post('/users')
      .set('Authorization', 'Bearer admin')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@test.com',
        password: 'val1dPassw0rd',
        roles: ['admin', 'user'],
      })
      .expect(201);

    const response = await request(app)
      .get('/users')
      .set('Authorization', 'Bearer admin')
      .query({ email: 'test@test.com' });

    expect(response.status).toBe(200);
    expect(response.body.user).toEqual({
      id: responseCreation.body.user.id,
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
      nodeEnv: 'test',
      db: {
        vendor: 'sqlite',
        host: ':memory:',
        logging: false,
      },
      grpc: {},
      credentialFacade: {
        domain: 'localhost',
        port: 50051,
      },
      domain: {
        domain: 'localhost',
      },
      rest: {},
      jwt: {
        publicKey: 'publicKey',
      },
    };
    await getAppSequelize(config);

    const userRepository = new UserRepositorySequelize(
      UserModelSequelize,
      UserMapper.mapToEntity,
      UserMapper.mapToModel
    );

    const role = new RoleEntity({ name: 'admin' });
    const role2 = new RoleEntity({ name: 'user' });

    const roleRepository = new RoleRepositorySequelize(
      RoleModelSequelize,
      RoleMapper.mapToEntity,
      RoleMapper.mapToModel
    );

    await roleRepository.insert(role);
    await roleRepository.insert(role2);

    const app = getAppExpress(userRepository, jwtService, credentialFacade);

    const responseCreation = await request(app)
      .post('/users')
      .set('Authorization', 'Bearer admin')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@test.com',
        password: 'val1dPassw0rd',
        roles: ['admin', 'user'],
      })
      .expect(201);

    const response = await request(app)
      .get(`/users/${responseCreation.body.user.id}`)
      .set('Authorization', 'Bearer admin');

    expect(response.status).toBe(200);
    expect(response.body.user).toEqual({
      id: responseCreation.body.user.id,
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      email: 'test@test.com',
      roles: ['admin', 'user'],
    });

    await UserModelSequelize.sequelize.close();
  });
});
