import { FacadeInterface, UseCase } from '@fvsystem/fvshop-shared-entities';
import {
  GetByEmailInputProps,
  GetByEmailOutputProps,
  GetByIdInputProps,
  GetByIdOutputProps,
} from '../usecase';

export type UserFacadeMethods = {
  getUserByEmail: UseCase<GetByEmailInputProps, GetByEmailOutputProps>;
  getUserById: UseCase<GetByIdInputProps, GetByIdOutputProps>;
};
export type UserFacadeInterface = FacadeInterface<UserFacadeMethods>;
