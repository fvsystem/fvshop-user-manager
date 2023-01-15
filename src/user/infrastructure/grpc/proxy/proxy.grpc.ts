import * as grpc from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { resolve } from 'node:path';
import {
  CreateUserInputProps,
  CreateUserOutputProps,
  GetAllUsersInputProps,
  GetAllUsersOutputProps,
  GetByEmailInputProps,
  GetByEmailOutputProps,
  GetByIdInputProps,
  GetByIdOutputProps,
  UserFacadeInterface,
} from '@root/user/application';
import { promisify } from 'util';
import { UseCase } from '@fvsystem/fvshop-shared-entities';
import {
  CreateUserClient,
  GetAllUsersClient,
  GetByEmailClient,
  GetByIdClient,
  ProtoGrpcType,
} from '../proto';

export class CreateUserUseCaseGrpc {
  constructor(private readonly client: CreateUserClient) {
    this.client = client;
  }

  async execute(input: CreateUserInputProps): Promise<CreateUserOutputProps> {
    const createUser = promisify(this.client.CreateUser.bind(this.client));
    return createUser(input);
  }
}

export class GetByEmailUseCaseGrpc {
  constructor(private readonly client: GetByEmailClient) {
    this.client = client;
  }

  async execute(input: GetByEmailInputProps): Promise<GetByEmailOutputProps> {
    const getByEmail = promisify(this.client.GetByEmail.bind(this.client));
    return getByEmail(input);
  }
}

export class GetAllUsersUseCaseGrpc {
  constructor(private readonly client: GetAllUsersClient) {
    this.client = client;
  }

  async execute(input: GetAllUsersInputProps): Promise<GetAllUsersOutputProps> {
    const getAllUsers = promisify(this.client.GetAllUsers.bind(this.client));
    return getAllUsers(input);
  }
}

export class GetByIdUserCaseGrpc {
  constructor(private readonly client: GetByIdClient) {
    this.client = client;
  }

  async execute(input: GetByIdInputProps): Promise<GetByIdOutputProps> {
    const getById = promisify(this.client.GetById.bind(this.client));
    return getById(input);
  }
}

export class UserFacadeProxyGrpc implements UserFacadeInterface {
  getUserByEmail: UseCase<GetByEmailInputProps, GetByEmailOutputProps>;

  getUserById: UseCase<GetByIdInputProps, GetByIdOutputProps>;

  getAllUsers: UseCase<GetAllUsersInputProps, GetAllUsersOutputProps>;

  createUser: UseCase<CreateUserInputProps, CreateUserOutputProps>;

  constructor(domain: string, port: number) {
    const protoPath = resolve(__dirname, '../proto/user.proto');
    const packageDefinition = loadSync(protoPath, {
      keepCase: true,
      defaults: true,
      oneofs: true,
    });
    const protoDescriptor = grpc.loadPackageDefinition(
      packageDefinition
    ) as unknown as ProtoGrpcType;

    const createUserClient = new protoDescriptor.CreateUser(
      `${domain}:${port}`,
      grpc.credentials.createInsecure()
    );
    const getByEmailClient = new protoDescriptor.GetByEmail(
      `${domain}:${port}`,
      grpc.credentials.createInsecure()
    );
    const getAllUsersClient = new protoDescriptor.GetAllUsers(
      `${domain}:${port}`,
      grpc.credentials.createInsecure()
    );
    const getByIdClient = new protoDescriptor.GetById(
      `${domain}:${port}`,
      grpc.credentials.createInsecure()
    );
    this.createUser = new CreateUserUseCaseGrpc(createUserClient);
    this.getUserByEmail = new GetByEmailUseCaseGrpc(getByEmailClient);
    this.getAllUsers = new GetAllUsersUseCaseGrpc(getAllUsersClient);
    this.getUserById = new GetByIdUserCaseGrpc(getByIdClient);
  }
}
