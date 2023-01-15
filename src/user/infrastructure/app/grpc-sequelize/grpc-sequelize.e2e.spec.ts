import { promisify } from 'util';
import * as grpc from '@grpc/grpc-js';
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
import {
  CreateUserClient,
  GetAllUsersClient,
  getAppGrpc,
  GetByEmailClient,
  GetByIdClient,
} from '../../grpc';

const credentialFacade = {
  createCredential: {
    execute: jest.fn(),
  },
  verifyCredential: {
    execute: jest.fn(),
  },
};

describe('E2E grpc-sequelize', () => {
  jest.setTimeout(10000);

  it('should create and find user', async () => {
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

    const roleRepository = new RoleRepositorySequelize(
      RoleModelSequelize,
      RoleMapper.mapToEntity,
      RoleMapper.mapToModel
    );

    await roleRepository.insert(role);

    const app = getAppGrpc(userRepository, credentialFacade);

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

    const createUserClient = app.getClient(
      'localhost',
      address,
      'CreateUser'
    ) as CreateUserClient;

    const createUser = promisify(
      createUserClient.CreateUser.bind(createUserClient)
    );

    const responseCreation = await createUser({
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@test.com',
      password: 'val1dPassw0rd',
      roles: ['admin'],
    });

    expect(responseCreation.user).toEqual({
      id: responseCreation.user.id,
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      email: 'test@test.com',
      roles: ['admin'],
    });

    createUserClient.close();

    const getByEmailClient = app.getClient(
      'localhost',
      address,
      'GetByEmail'
    ) as GetByEmailClient;

    const getByEmail = promisify(
      getByEmailClient.GetByEmail.bind(getByEmailClient)
    );

    const responseGetByEmail = await getByEmail({
      email: 'test@test.com',
    });

    expect(responseGetByEmail.user).toEqual({
      id: responseGetByEmail.user.id,
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      email: 'test@test.com',
      roles: ['admin'],
    });

    getByEmailClient.close();

    const getByIdClient = app.getClient(
      'localhost',
      address,
      'GetById'
    ) as GetByIdClient;

    const getById = promisify(getByIdClient.GetById.bind(getByIdClient));

    const responseGetById = await getById({
      userId: responseCreation.user.id,
    });

    expect(responseGetById.user).toEqual({
      id: responseGetById.user.id,
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      email: 'test@test.com',
      roles: ['admin'],
    });

    getByIdClient.close();

    const getAllUsersClient = app.getClient(
      'localhost',
      address,
      'GetAllUsers'
    ) as GetAllUsersClient;

    const getAllUsers = promisify(
      getAllUsersClient.GetAllUsers.bind(getAllUsersClient)
    );

    const responseGetAllUsers = await getAllUsers({});
    expect(responseGetAllUsers.users).toEqual([
      {
        id: responseGetAllUsers.users[0].id,
        firstName: 'John',
        lastName: 'Doe',
        fullName: 'John Doe',
        email: 'test@test.com',
        roles: ['admin'],
      },
    ]);

    getAllUsersClient.close();

    app.server.forceShutdown();

    const sleep = promisify(setTimeout);
    await sleep(6000);
  });
});
