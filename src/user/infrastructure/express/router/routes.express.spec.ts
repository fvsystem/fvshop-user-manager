import {
  NotFoundError,
  UniqueEntityId,
} from '@fvsystem/fvshop-shared-entities';
import {
  NameValueObject,
  RoleEntity,
  UserEntity,
  UserRepositoryInterface,
} from '@root/user/domain';
import { v4 as uuid } from 'uuid';
import express, { Router } from 'express';
import request from 'supertest';
import { RoutesExpressUser } from './routes.express';

const uuidValueAdmin = uuid();
const uuidValueUserAdmin = uuid();
const uuidValueUser = uuid();
const uuidValueUser2 = uuid();

const userAdmin = new UserEntity(
  {
    email: 'test@test.com',
    name: new NameValueObject({
      firstName: 'John',
      lastName: 'Doe',
    }),
    roles: [
      new RoleEntity({
        name: 'admin',
      }),
    ],
  },

  new UniqueEntityId(uuidValueAdmin)
);

const userUserAdmin = new UserEntity(
  {
    email: 'test2@test.com',
    name: new NameValueObject({
      firstName: 'Jane',
      lastName: 'Doe',
    }),
    roles: [
      new RoleEntity({
        name: 'users-admin',
      }),
    ],
  },

  new UniqueEntityId(uuidValueUserAdmin)
);

const regularUser = new UserEntity(
  {
    email: 'test3@test.com',
    name: new NameValueObject({
      firstName: 'Jane',
      lastName: 'Dana',
    }),
    roles: [
      new RoleEntity({
        name: 'user',
      }),
    ],
  },

  new UniqueEntityId(uuidValueUser)
);

const regularUser2 = new UserEntity(
  {
    email: 'test4@test.com',
    name: new NameValueObject({
      firstName: 'Jane',
      lastName: 'Dana2',
    }),
    roles: [
      new RoleEntity({
        name: 'user',
      }),
    ],
  },

  new UniqueEntityId(uuidValueUser2)
);

class MockUserRepository implements UserRepositoryInterface {
  sortableFields: string[] = ['email'];

  users: UserEntity[];

  constructor(users: UserEntity[]) {
    this.users = users;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = this.users.find((userItem) => userItem.email === email);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async insert(entity: UserEntity): Promise<void> {
    this.users.push(entity);
  }

  async bulkInsert(entities: UserEntity[]): Promise<void> {
    this.users = [...this.users, ...entities];
  }

  async getRoles(id: string): Promise<RoleEntity[]> {
    const user = this.users.find((userItem) => userItem.id === id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user.roles;
  }

  async findById(id: string | UniqueEntityId): Promise<UserEntity> {
    const user = this.users.find((userItem) => userItem.id === id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.users;
  }

  async update(entity: UserEntity): Promise<void> {
    const index = this.users.findIndex((userItem) => userItem.id === entity.id);
    if (index === -1) {
      throw new NotFoundError('User not found');
    }
    this.users[index] = entity;
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    this.users = this.users.filter((userItem) => userItem.id !== id);
  }
}

const jwtService = {
  sign: jest.fn(),
  verify: jest.fn().mockImplementation(
    (token) =>
      new Promise((resolve, reject) => {
        if (token === 'admin') {
          resolve({
            userId: uuidValueAdmin,
            email: 'test@test.com',
            scope: ['admin'],
          });
        }
        if (token === 'users-admin') {
          resolve({
            userId: uuidValueUserAdmin,
            email: 'test2@test.com',
            scope: ['users-admin'],
          });
        }
        if (token === 'user') {
          resolve({
            userId: uuidValueUser,
            email: 'test3@test.com',
            scope: ['user'],
          });
        }

        if (token === 'user2') {
          resolve({
            userId: uuidValueUser2,
            email: 'test4@test.com',
            scope: ['user'],
          });
        }
        reject(new Error('Invalid token'));
      })
  ),
};

const app = express();

const routesExpressIdentity = new RoutesExpressUser(
  new MockUserRepository([userAdmin, userUserAdmin, regularUser, regularUser2]),
  jwtService
);

const routes = Router();
routesExpressIdentity.addRoutes(routes);
app.use(express.json());
app.use(routes);

describe('VerifyUserUseCase', () => {
  it('should return user with right email when logged by admin', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', 'bearer admin')
      .query({ email: 'test@test.com' });

    expect(response.status).toBe(200);
    expect(response.body.user.email).toBe('test@test.com');
  });

  it('should return user with right email when logged by users-admin', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', 'bearer users-admin')
      .query({ email: 'test@test.com' });

    expect(response.status).toBe(200);
    expect(response.body.user.email).toBe('test@test.com');
  });

  it('should not return user with right email when logged by regular user', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', 'bearer user')
      .query({ email: 'test@test.com' });

    expect(response.status).toBe(401);
  });

  it('should not return user with right email when not logged', async () => {
    const response = await request(app)
      .get('/users')
      .query({ email: 'test@test.com' });

    expect(response.status).toBe(401);
  });

  it('should return users when logged by admin', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', 'bearer admin');

    expect(response.status).toBe(200);
    expect(response.body.users[0].email).toBe('test@test.com');
  });

  it('should return users when logged by users-admin', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', 'bearer users-admin');

    expect(response.status).toBe(200);
    expect(response.body.users[0].email).toBe('test@test.com');
  });

  it('should not return users when logged by regular user', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', 'bearer user');

    expect(response.status).toBe(401);
  });

  it('should not return users when not logged', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(401);
  });

  it('should return 400 if user does not exist', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', 'bearer admin')
      .query({ email: 'noUser' });
    expect(response.status).toBe(400);
  });

  it('should return 200 if id is valid and logger by admin', async () => {
    const response = await request(app)
      .get(`/users/${uuidValueUser}`)
      .set('Authorization', 'bearer admin');
    expect(response.status).toBe(200);
    expect(response.body.user.email).toBe('test3@test.com');
  });

  it('should return 200 if id is valid and logger by users-admin', async () => {
    const response = await request(app)
      .get(`/users/${uuidValueUser}`)
      .set('Authorization', 'bearer users-admin');
    expect(response.status).toBe(200);
    expect(response.body.user.email).toBe('test3@test.com');
  });

  it('should return 200 if id is valid and logger by the right user', async () => {
    const response = await request(app)
      .get(`/users/${uuidValueUser}`)
      .set('Authorization', 'bearer user');
    expect(response.status).toBe(200);
    expect(response.body.user.email).toBe('test3@test.com');
  });

  it('should return 403 if id is valid and logged by a wrong user', async () => {
    const response = await request(app)
      .get(`/users/${uuidValueUser}`)
      .set('Authorization', 'bearer user2');
    expect(response.status).toBe(403);
  });

  it('should return 401 if id is valid and not logged', async () => {
    const response = await request(app).get(`/users/${uuidValueUser}`);
    expect(response.status).toBe(401);
  });

  it('should return 400 if user does not exist', async () => {
    const response = await request(app)
      .get(`/users/noUser`)
      .set('Authorization', 'bearer users-admin');
    expect(response.status).toBe(400);
  });
});
