import CredentialFacade from '@fvsystem/fvshop-identity';
import { FacadeInterface, UseCase } from '@fvsystem/fvshop-shared-entities';
import { UserRepositoryInterface } from '@root/user/domain';
import {
  GetByEmailInputProps,
  GetByEmailOutputProps,
  GetByEmailUseCase,
  GetByIdInputProps,
  GetByIdOutputProps,
  GetByIdUseCase,
  GetAllUsersInputProps,
  GetAllUsersOutputProps,
  GetAllUsersUseCase,
  CreateUserInputProps,
  CreateUserOutputProps,
  CreateUserUseCase,
} from '../usecase';

export type UserFacadeMethods = {
  getUserByEmail: UseCase<GetByEmailInputProps, GetByEmailOutputProps>;
  getUserById: UseCase<GetByIdInputProps, GetByIdOutputProps>;
  getAllUsers: UseCase<GetAllUsersInputProps, GetAllUsersOutputProps>;
  createUser: UseCase<CreateUserInputProps, CreateUserOutputProps>;
};
export type UserFacadeInterface = FacadeInterface<UserFacadeMethods>;

export class UserFacadeImpl implements UserFacadeInterface {
  getUserByEmail: UseCase<GetByEmailInputProps, GetByEmailOutputProps>;

  getUserById: UseCase<GetByIdInputProps, GetByIdOutputProps>;

  getAllUsers: UseCase<GetAllUsersInputProps, GetAllUsersOutputProps>;

  createUser: UseCase<CreateUserInputProps, CreateUserOutputProps>;

  constructor(
    userRepository: UserRepositoryInterface,
    credentialFacade: CredentialFacade
  ) {
    this.getUserByEmail = new GetByEmailUseCase(userRepository);
    this.getUserById = new GetByIdUseCase(userRepository);
    this.getAllUsers = new GetAllUsersUseCase(userRepository);
    this.createUser = new CreateUserUseCase(userRepository, credentialFacade);
  }
}
