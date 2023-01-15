// Original file: src/user/infrastructure/grpc/proto/user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateUserRequest as _CreateUserRequest, CreateUserRequest__Output as _CreateUserRequest__Output } from './CreateUserRequest';
import type { CreateUserResponse as _CreateUserResponse, CreateUserResponse__Output as _CreateUserResponse__Output } from './CreateUserResponse';

export interface CreateUserClient extends grpc.Client {
  CreateUser(argument: _CreateUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  CreateUser(argument: _CreateUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  CreateUser(argument: _CreateUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  CreateUser(argument: _CreateUserRequest, callback: grpc.requestCallback<_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  createUser(argument: _CreateUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  createUser(argument: _CreateUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  createUser(argument: _CreateUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  createUser(argument: _CreateUserRequest, callback: grpc.requestCallback<_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface CreateUserHandlers extends grpc.UntypedServiceImplementation {
  CreateUser: grpc.handleUnaryCall<_CreateUserRequest__Output, _CreateUserResponse>;
  
}

export interface CreateUserDefinition extends grpc.ServiceDefinition {
  CreateUser: MethodDefinition<_CreateUserRequest, _CreateUserResponse, _CreateUserRequest__Output, _CreateUserResponse__Output>
}
