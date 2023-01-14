import { NameValueObject, RoleEntity, UserEntity } from '@root/user/domain';
import { UserRepositoryMock } from '@root/user/domain/repository/user.repository.mock';
import request from 'supertest';
import { getAppExpress } from './app.express';

const name = new NameValueObject({
  firstName: 'John',
  lastName: 'Doe',
});

const role = new RoleEntity({
  name: 'admin',
});

const user = new UserEntity({
  name,
  roles: [role],
  email: 'test@test.com',
});

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

const app = getAppExpress(new UserRepositoryMock(user), jwtService);

describe('UserApplicationService', () => {
  beforeEach(async () => {
    jest.restoreAllMocks();
  });
  it('should get user by email', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', 'bearer admin')
      .query({ email: 'test@test.com' });
    expect(response.status).toBe(200);
    expect(response.body.user).toEqual({
      id: user.id,
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      email: 'test@test.com',
      roles: ['admin'],
    });
  });

  it('should get user by id', async () => {
    const response = await request(app)
      .get(`/users/${user.id}`)
      .set('Authorization', 'bearer admin');

    expect(response.status).toBe(200);
    expect(response.body.user).toEqual({
      id: user.id,
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      email: 'test@test.com',
      roles: ['admin'],
    });
  });
});
