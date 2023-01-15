// Original file: src/user/infrastructure/grpc/proto/user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GetByEmailRequest as _GetByEmailRequest, GetByEmailRequest__Output as _GetByEmailRequest__Output } from './GetByEmailRequest';
import type { GetByEmailResponse as _GetByEmailResponse, GetByEmailResponse__Output as _GetByEmailResponse__Output } from './GetByEmailResponse';

export interface GetByEmailClient extends grpc.Client {
  GetByEmail(argument: _GetByEmailRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_GetByEmailResponse__Output>): grpc.ClientUnaryCall;
  GetByEmail(argument: _GetByEmailRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_GetByEmailResponse__Output>): grpc.ClientUnaryCall;
  GetByEmail(argument: _GetByEmailRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_GetByEmailResponse__Output>): grpc.ClientUnaryCall;
  GetByEmail(argument: _GetByEmailRequest, callback: grpc.requestCallback<_GetByEmailResponse__Output>): grpc.ClientUnaryCall;
  getByEmail(argument: _GetByEmailRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_GetByEmailResponse__Output>): grpc.ClientUnaryCall;
  getByEmail(argument: _GetByEmailRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_GetByEmailResponse__Output>): grpc.ClientUnaryCall;
  getByEmail(argument: _GetByEmailRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_GetByEmailResponse__Output>): grpc.ClientUnaryCall;
  getByEmail(argument: _GetByEmailRequest, callback: grpc.requestCallback<_GetByEmailResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface GetByEmailHandlers extends grpc.UntypedServiceImplementation {
  GetByEmail: grpc.handleUnaryCall<_GetByEmailRequest__Output, _GetByEmailResponse>;
  
}

export interface GetByEmailDefinition extends grpc.ServiceDefinition {
  GetByEmail: MethodDefinition<_GetByEmailRequest, _GetByEmailResponse, _GetByEmailRequest__Output, _GetByEmailResponse__Output>
}
