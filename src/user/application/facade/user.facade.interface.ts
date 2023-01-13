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
} from '../usecase';

export type UserFacadeMethods = {
  getUserByEmail: UseCase<GetByEmailInputProps, GetByEmailOutputProps>;
  getUserById: UseCase<GetByIdInputProps, GetByIdOutputProps>;
  getAllUsers: UseCase<GetAllUsersInputProps, GetAllUsersOutputProps>;
};
export type UserFacadeInterface = FacadeInterface<UserFacadeMethods>;

export class UserFacadeImpl implements UserFacadeInterface {
  getUserByEmail: UseCase<GetByEmailInputProps, GetByEmailOutputProps>;

  getUserById: UseCase<GetByIdInputProps, GetByIdOutputProps>;

  getAllUsers: UseCase<GetAllUsersInputProps, GetAllUsersOutputProps>;

  constructor(userRepository: UserRepositoryInterface) {
    this.getUserByEmail = new GetByEmailUseCase(userRepository);
    this.getUserById = new GetByIdUseCase(userRepository);
    this.getAllUsers = new GetAllUsersUseCase(userRepository);
  }
}
