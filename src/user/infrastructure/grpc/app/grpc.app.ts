/* eslint-disable no-restricted-syntax */
import { resolve } from 'node:path';
import * as grpc from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { UserRepositoryInterface } from '@root/user/domain';
import CredentialFacade from '@fvsystem/fvshop-identity';
import { getHandlers, Handlers } from '../handler/grpc.handler';
import {
  GetByEmailClient,
  GetByIdClient,
  GetAllUsersClient,
  CreateUserClient,
  ProtoGrpcType,
  HealthClient,
} from '../proto';

const protoPath = resolve(__dirname, '../proto/user.proto');

export type Services =
  | GetByEmailClient
  | GetByIdClient
  | GetAllUsersClient
  | CreateUserClient
  | HealthClient;

export type ServicesNames =
  | 'GetByEmail'
  | 'GetById'
  | 'GetAllUsers'
  | 'CreateUser'
  | 'Health';

export class ServerGrpc {
  private readonly _packageDefinition: ProtoGrpcType;

  private readonly _server: grpc.Server;

  constructor(packageDefinition: ProtoGrpcType, handlers: Handlers) {
    this._packageDefinition = packageDefinition;

    this._server = new grpc.Server();
    this._server.addService(
      this._packageDefinition.CreateUser.service,
      handlers.CreateUser
    );
    this._server.addService(
      this._packageDefinition.GetAllUsers.service,
      handlers.GetAllUsers
    );
    this._server.addService(
      this._packageDefinition.GetByEmail.service,
      handlers.GetByEmail
    );
    this._server.addService(
      this._packageDefinition.GetById.service,
      handlers.GetById
    );
    this._server.addService(
      this._packageDefinition.Health.service,
      handlers.Health
    );
  }

  get server(): grpc.Server {
    return this._server;
  }

  get packageDefinition(): ProtoGrpcType {
    return this._packageDefinition;
  }

  public getClient(
    domain: string,
    port: number,
    service: ServicesNames
  ): Services {
    const client = new this.packageDefinition[service](
      `${domain}:${port}`,
      grpc.credentials.createInsecure()
    );

    return client;
  }
}

export function getAppGrpc(
  userRepository: UserRepositoryInterface,
  credentialFacade: CredentialFacade
): ServerGrpc {
  const packageDefinition = loadSync(protoPath, {
    keepCase: true,
    defaults: true,
    oneofs: true,
  });

  const protoDescriptor = grpc.loadPackageDefinition(
    packageDefinition
  ) as unknown as ProtoGrpcType;

  const handlers = getHandlers(userRepository, credentialFacade);

  const server = new ServerGrpc(protoDescriptor, handlers);

  return server;
}
