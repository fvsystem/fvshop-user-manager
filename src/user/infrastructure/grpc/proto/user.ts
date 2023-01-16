// Original file: src/user/infrastructure/grpc/proto/user.proto
import * as grpc from '@grpc/grpc-js';
import { MessageTypeDefinition } from '@grpc/proto-loader';
import {
  GetByEmailClient as _GetByEmailClient,
  GetByEmailDefinition as _GetByEmailDefinition,
} from './GetByEmail';
import type {
  GetByIdClient as _GetByIdClient,
  GetByIdDefinition as _GetByIdDefinition,
} from './GetById';
import type {
  GetAllUsersClient as _GetAllUsersClient,
  GetAllUsersDefinition as _GetAllUsersDefinition,
} from './GetAllUsers';
import type {
  CreateUserClient as _CreateUserClient,
  CreateUserDefinition as _CreateUserDefinition,
} from './CreateUser';
import type {
  HealthClient as _grpc_health_v1_HealthClient,
  HealthDefinition as _grpc_health_v1_HealthDefinition,
} from './grpc/health/v1/Health';

export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  roles?: string[];
}

export interface User__Output {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  roles: string[];
}

type SubtypeConstructor<
  Constructor extends new (...args: any) => any,
  Subtype
> = {
  new (...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  CreateUser: SubtypeConstructor<typeof grpc.Client, _CreateUserClient> & {
    service: _CreateUserDefinition;
  };
  CreateUserRequest: MessageTypeDefinition;
  CreateUserResponse: MessageTypeDefinition;
  GetAllUsers: SubtypeConstructor<typeof grpc.Client, _GetAllUsersClient> & {
    service: _GetAllUsersDefinition;
  };
  GetAllUsersRequest: MessageTypeDefinition;
  GetAllUsersResponse: MessageTypeDefinition;
  GetByEmail: SubtypeConstructor<typeof grpc.Client, _GetByEmailClient> & {
    service: _GetByEmailDefinition;
  };
  GetByEmailRequest: MessageTypeDefinition;
  GetByEmailResponse: MessageTypeDefinition;
  GetById: SubtypeConstructor<typeof grpc.Client, _GetByIdClient> & {
    service: _GetByIdDefinition;
  };
  GetByIdRequest: MessageTypeDefinition;
  GetByIdResponse: MessageTypeDefinition;
  User: MessageTypeDefinition;
  grpc: {
    health: {
      v1: {
        Health: SubtypeConstructor<
          typeof grpc.Client,
          _grpc_health_v1_HealthClient
        > & { service: _grpc_health_v1_HealthDefinition };
        HealthCheckRequest: MessageTypeDefinition;
        HealthCheckResponse: MessageTypeDefinition;
      };
    };
  };
}
