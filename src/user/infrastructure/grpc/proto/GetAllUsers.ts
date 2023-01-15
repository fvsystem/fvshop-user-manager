// Original file: src/user/infrastructure/grpc/proto/user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GetAllUsersRequest as _GetAllUsersRequest, GetAllUsersRequest__Output as _GetAllUsersRequest__Output } from './GetAllUsersRequest';
import type { GetAllUsersResponse as _GetAllUsersResponse, GetAllUsersResponse__Output as _GetAllUsersResponse__Output } from './GetAllUsersResponse';

export interface GetAllUsersClient extends grpc.Client {
  GetAllUsers(argument: _GetAllUsersRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_GetAllUsersResponse__Output>): grpc.ClientUnaryCall;
  GetAllUsers(argument: _GetAllUsersRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_GetAllUsersResponse__Output>): grpc.ClientUnaryCall;
  GetAllUsers(argument: _GetAllUsersRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_GetAllUsersResponse__Output>): grpc.ClientUnaryCall;
  GetAllUsers(argument: _GetAllUsersRequest, callback: grpc.requestCallback<_GetAllUsersResponse__Output>): grpc.ClientUnaryCall;
  getAllUsers(argument: _GetAllUsersRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_GetAllUsersResponse__Output>): grpc.ClientUnaryCall;
  getAllUsers(argument: _GetAllUsersRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_GetAllUsersResponse__Output>): grpc.ClientUnaryCall;
  getAllUsers(argument: _GetAllUsersRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_GetAllUsersResponse__Output>): grpc.ClientUnaryCall;
  getAllUsers(argument: _GetAllUsersRequest, callback: grpc.requestCallback<_GetAllUsersResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface GetAllUsersHandlers extends grpc.UntypedServiceImplementation {
  GetAllUsers: grpc.handleUnaryCall<_GetAllUsersRequest__Output, _GetAllUsersResponse>;
  
}

export interface GetAllUsersDefinition extends grpc.ServiceDefinition {
  GetAllUsers: MethodDefinition<_GetAllUsersRequest, _GetAllUsersResponse, _GetAllUsersRequest__Output, _GetAllUsersResponse__Output>
}
