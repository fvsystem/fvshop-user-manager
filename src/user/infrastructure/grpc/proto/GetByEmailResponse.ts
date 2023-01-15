// Original file: src/user/infrastructure/grpc/proto/user.proto

import type { User as _User, User__Output as _User__Output } from './user';

export interface GetByEmailResponse {
  user?: _User | null;
}

export interface GetByEmailResponse__Output {
  user: _User__Output | null;
}
