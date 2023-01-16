import { promisify } from 'util';
import * as grpc from '@grpc/grpc-js';
import {
  NotFoundError,
  UniqueEntityId,
} from '@fvsystem/fvshop-shared-entities';
import {
  RoleEntity,
  UserEntity,
  UserRepositoryInterface,
} from '@root/user/domain';
import { getAppGrpc, ServerGrpc } from './grpc.app';
import {
  CreateUserClient,
  GetAllUsersClient,
  GetByEmailClient,
  GetByIdClient,
} from '../proto';
import { HealthClient } from '../proto/grpc/health/v1/Health';

let app: ServerGrpc;
let getByEmailClient: GetByEmailClient;
let getByIdClient: GetByIdClient;
let getAllUsersClient: GetAllUsersClient;
let createUserClient: CreateUserClient;
let health: HealthClient;

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

const credentialFacade = {
  createCredential: {
    execute: jest.fn(),
  },
  verifyCredential: {
    execute: jest.fn(),
  },
};
const userRepository = new MockUserRepository([]);

describe('App Express', () => {
  jest.setTimeout(10000);
  beforeAll(async () => {
    app = getAppGrpc(userRepository, credentialFacade);

    let address: number;

    await new Promise<void>((resolve, reject) => {
      app.server.bindAsync(
        'localhost:0',
        grpc.ServerCredentials.createInsecure(),
        (err, port) => {
          if (err) {
            reject(err);
          } else {
            app.server.start();
            address = port;
            resolve();
          }
        }
      );
    });

    getByEmailClient = app.getClient(
      'localhost',
      address,
      'GetByEmail'
    ) as GetByEmailClient;
    getByIdClient = app.getClient(
      'localhost',
      address,
      'GetById'
    ) as GetByIdClient;
    getAllUsersClient = app.getClient(
      'localhost',
      address,
      'GetAllUsers'
    ) as GetAllUsersClient;
    createUserClient = app.getClient(
      'localhost',
      address,
      'CreateUser'
    ) as CreateUserClient;
    health = app.getClient('localhost', address, 'Health') as HealthClient;
  });

  afterAll(async () => {
    getByEmailClient.close();
    getByIdClient.close();
    getAllUsersClient.close();
    createUserClient.close();
    health.close();
    const sleep = promisify(setTimeout);
    await sleep(6000);
    const finish = promisify(app.server.tryShutdown.bind(app.server));
    await finish();
  });

  it('should create user and find it', async () => {
    const healthCheck = promisify(health.check.bind(health));
    await expect(healthCheck({})).resolves.toEqual({ status: 1 });

    const createUser = promisify(
      createUserClient.CreateUser.bind(createUserClient)
    );

    await expect(
      createUser({
        email: 'test@test.com',
        password: 'validHFH676',
        firstName: 'John',
        lastName: 'Doe',
        roles: ['admin'],
      })
    ).resolves.toEqual({
      user: {
        id: expect.any(String),
        email: 'test@test.com',
        firstName: 'John',
        lastName: 'Doe',
        roles: ['admin'],
        fullName: 'John Doe',
      },
    });

    const getByEmail = promisify(
      getByEmailClient.GetByEmail.bind(getByEmailClient)
    );

    await expect(
      getByEmail({
        email: 'test@test.com',
      })
    ).resolves.toEqual({
      user: {
        id: expect.any(String),
        email: 'test@test.com',
        firstName: 'John',
        lastName: 'Doe',
        roles: ['admin'],
        fullName: 'John Doe',
      },
    });

    const user = await userRepository.findByEmail('test@test.com');

    const getById = promisify(getByIdClient.GetById.bind(getByIdClient));

    await expect(
      getById({
        userId: user.id,
      })
    ).resolves.toEqual({
      user: {
        id: user.id,
        email: 'test@test.com',
        firstName: 'John',
        lastName: 'Doe',
        roles: ['admin'],
        fullName: 'John Doe',
      },
    });

    const getAllUsers = promisify(
      getAllUsersClient.GetAllUsers.bind(getAllUsersClient)
    );

    await expect(getAllUsers({})).resolves.toEqual({
      users: [
        {
          id: user.id,
          email: 'test@test.com',
          firstName: 'John',
          lastName: 'Doe',
          roles: ['admin'],
          fullName: 'John Doe',
        },
      ],
    });
  });
});
