// Original file: src/user/infrastructure/grpc/proto/user.proto


export interface CreateUserRequest {
  'firstName'?: (string);
  'lastName'?: (string);
  'email'?: (string);
  'roles'?: (string)[];
  'password'?: (string);
}

export interface CreateUserRequest__Output {
  'firstName': (string);
  'lastName': (string);
  'email': (string);
  'roles': (string)[];
  'password': (string);
}
