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

const uuidValue = uuid();

const user = new UserEntity(
  {
    email: 'test@test.com',
    name: new NameValueObject({
      firstName: 'John',
      lastName: 'Doe',
    }),
    roles: [
      new RoleEntity({
        name: 'SalesAdministrator',
      }),
    ],
  },

  new UniqueEntityId(uuidValue)
);

class MockUserRepository implements UserRepositoryInterface {
  sortableFields: string[] = ['email'];

  user: UserEntity;

  constructor(userProp: UserEntity) {
    this.user = userProp;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    if (email === 'noUser') {
      throw new NotFoundError('User not found');
    }
    return this.user;
  }

  async insert(entity: UserEntity): Promise<void> {
    console.log('inserted');
  }

  async bulkInsert(entities: UserEntity[]): Promise<void> {
    console.log('bulk inserted');
  }

  async getRoles(id: string): Promise<RoleEntity[]> {
    return [
      new RoleEntity({
        name: 'SalesAdministrator',
      }),
    ];
  }

  async findById(id: string | UniqueEntityId): Promise<UserEntity> {
    if (id === 'noUser') {
      throw new NotFoundError('User not found');
    }
    return this.user;
  }

  async findAll(): Promise<UserEntity[]> {
    return [this.user];
  }

  async update(entity: UserEntity): Promise<void> {
    console.log('updated');
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    console.log('deleted');
  }
}

const app = express();

const routesExpressIdentity = new RoutesExpressUser(
  new MockUserRepository(user)
);

const routes = Router();
routesExpressIdentity.addRoutes(routes);
app.use(express.json());
app.use(routes);

describe('VerifyUserUseCase', () => {
  it('should return user with right email', async () => {
    const response = await request(app)
      .get('/users')
      .query({ email: 'test@test.com' });

    expect(response.status).toBe(200);
    expect(response.body.user.email).toBe('test@test.com');
  });

  it('should return users', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.body.users[0].email).toBe('test@test.com');
  });

  it('should return 400 if user does not exist', async () => {
    const response = await request(app)
      .get('/users')
      .query({ email: 'noUser' });
    expect(response.status).toBe(400);
  });

  it('should return 200 if id is valid', async () => {
    const response = await request(app).get(`/users/${uuidValue}`);
    expect(response.status).toBe(200);
    expect(response.body.user.email).toBe('test@test.com');
  });

  it('should return 400 if user does not exist', async () => {
    const response = await request(app).get(`/users/noUser`);
    expect(response.status).toBe(400);
  });
});
