import { NameValueObject, RoleEntity, UserEntity } from '@root/user/domain';
import { UserRepositoryMock } from '@root/user/domain/repository/user.repository.mock';
import request from 'supertest';
import { getAppExpress } from './app.express';

const name = new NameValueObject({
  firstName: 'John',
  lastName: 'Doe',
});

const role = new RoleEntity({
  name: 'SalesAdministrator',
});

const user = new UserEntity({
  name,
  roles: [role],
  email: 'test@test.com',
});

const app = getAppExpress(new UserRepositoryMock(user));

describe('UserApplicationService', () => {
  beforeEach(async () => {
    jest.resetAllMocks();
  });
  it('should get user by email', async () => {
    const response = await request(app)
      .get('/users')
      .query({ email: 'test@test.com' });
    expect(response.status).toBe(200);
    expect(response.body.user).toEqual({
      id: user.id,
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      email: 'test@test.com',
      roles: ['SalesAdministrator'],
    });
  });

  it('should get user by id', async () => {
    const response = await request(app).get(`/users/${user.id}`);
    expect(response.status).toBe(200);
    expect(response.body.user).toEqual({
      id: user.id,
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      email: 'test@test.com',
      roles: ['SalesAdministrator'],
    });
  });
});
