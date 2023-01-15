// Original file: src/user/infrastructure/grpc/proto/user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GetByIdRequest as _GetByIdRequest, GetByIdRequest__Output as _GetByIdRequest__Output } from './GetByIdRequest';
import type { GetByIdResponse as _GetByIdResponse, GetByIdResponse__Output as _GetByIdResponse__Output } from './GetByIdResponse';

export interface GetByIdClient extends grpc.Client {
  GetById(argument: _GetByIdRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_GetByIdResponse__Output>): grpc.ClientUnaryCall;
  GetById(argument: _GetByIdRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_GetByIdResponse__Output>): grpc.ClientUnaryCall;
  GetById(argument: _GetByIdRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_GetByIdResponse__Output>): grpc.ClientUnaryCall;
  GetById(argument: _GetByIdRequest, callback: grpc.requestCallback<_GetByIdResponse__Output>): grpc.ClientUnaryCall;
  getById(argument: _GetByIdRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_GetByIdResponse__Output>): grpc.ClientUnaryCall;
  getById(argument: _GetByIdRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_GetByIdResponse__Output>): grpc.ClientUnaryCall;
  getById(argument: _GetByIdRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_GetByIdResponse__Output>): grpc.ClientUnaryCall;
  getById(argument: _GetByIdRequest, callback: grpc.requestCallback<_GetByIdResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface GetByIdHandlers extends grpc.UntypedServiceImplementation {
  GetById: grpc.handleUnaryCall<_GetByIdRequest__Output, _GetByIdResponse>;
  
}

export interface GetByIdDefinition extends grpc.ServiceDefinition {
  GetById: MethodDefinition<_GetByIdRequest, _GetByIdResponse, _GetByIdRequest__Output, _GetByIdResponse__Output>
}
