/* eslint-disable no-underscore-dangle */
import CredentialFacade from '@fvsystem/fvshop-identity';
import {
  CreateUserOutputProps,
  UserFacadeImpl,
  CreateUserInputProps,
  GetByIdInputProps,
  GetByIdOutputProps,
  GetByEmailInputProps,
  GetByEmailOutputProps,
  GetAllUsersInputProps,
  GetAllUsersOutputProps,
} from '@root/user/application';
import { UserRepositoryInterface } from '@root/user/domain';
import { CreateUserHandlers } from '../proto/CreateUser';
import { GetByEmailHandlers } from '../proto/GetByEmail';
import { GetByIdHandlers } from '../proto/GetById';
import { GetAllUsersHandlers } from '../proto/GetAllUsers';

export interface Handlers {
  CreateUser: CreateUserHandlers;
  GetById: GetByIdHandlers;
  GetByEmail: GetByEmailHandlers;
  GetAllUsers: GetAllUsersHandlers;
}

export function getHandlers(
  userRepository: UserRepositoryInterface,

  credentialFacade: CredentialFacade
): Handlers {
  const userFacade = new UserFacadeImpl(userRepository, credentialFacade);

  return {
    CreateUser: {
      CreateUser: (call, callback) => {
        (
          userFacade.createUser.execute as (
            inputProps: CreateUserInputProps
          ) => Promise<CreateUserOutputProps>
        )(call.request)
          .then((output) => callback(null, output))
          .catch((error) => callback(error));
      },
    },
    GetById: {
      GetById: (call, callback) => {
        (
          userFacade.getUserById.execute as (
            inputProps: GetByIdInputProps
          ) => Promise<GetByIdOutputProps>
        )(call.request)
          .then((output) => callback(null, output))
          .catch((error) => callback(error));
      },
    },
    GetByEmail: {
      GetByEmail: (call, callback) => {
        (
          userFacade.getUserByEmail.execute as (
            inputProps: GetByEmailInputProps
          ) => Promise<GetByEmailOutputProps>
        )(call.request)
          .then((output) => callback(null, output))
          .catch((error) => callback(error));
      },
    },
    GetAllUsers: {
      GetAllUsers: (call, callback) => {
        (
          userFacade.getAllUsers.execute as (
            inputProps: GetAllUsersInputProps
          ) => Promise<GetAllUsersOutputProps>
        )(call.request)
          .then((output) => callback(null, output))
          .catch((error) => callback(error));
      },
    },
  };
}
