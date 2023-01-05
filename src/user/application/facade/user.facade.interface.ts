import { FacadeInterface, UseCase } from '@fvsystem/fvshop-shared-entities';
import { UserRepositoryInterface } from '@root/user/domain';
import {
  GetByEmailInputProps,
  GetByEmailOutputProps,
  GetByEmailUseCase,
  GetByIdInputProps,
  GetByIdOutputProps,
  GetByIdUseCase,
} from '../usecase';

export type UserFacadeMethods = {
  getUserByEmail: UseCase<GetByEmailInputProps, GetByEmailOutputProps>;
  getUserById: UseCase<GetByIdInputProps, GetByIdOutputProps>;
};
export type UserFacadeInterface = FacadeInterface<UserFacadeMethods>;

export class UserFacadeImpl implements UserFacadeInterface {
  getUserByEmail: UseCase<GetByEmailInputProps, GetByEmailOutputProps>;

  getUserById: UseCase<GetByIdInputProps, GetByIdOutputProps>;

  constructor(userRepository: UserRepositoryInterface) {
    this.getUserByEmail = new GetByEmailUseCase(userRepository);
    this.getUserById = new GetByIdUseCase(userRepository);
  }
}
