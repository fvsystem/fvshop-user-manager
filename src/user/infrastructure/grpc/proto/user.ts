// Original file: src/user/infrastructure/grpc/proto/user.proto
import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';
import {
  GetByEmailClient as _GetByEmailClient,
  GetByEmailDefinition as _GetByEmailDefinition,
} from './GetByEmail';
import type {
  GetByIdClient as _GetByIdClient,
  GetByIdDefinition as _GetByIdDefinition,
} from './GetById';
import {
  GetAllUsersClient as _GetAllUsersClient,
  GetAllUsersDefinition as _GetAllUsersDefinition,
} from './GetAllUsers';
import {
  CreateUserClient as _CreateUserClient,
  CreateUserDefinition as _CreateUserDefinition,
} from './CreateUser';

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
}
