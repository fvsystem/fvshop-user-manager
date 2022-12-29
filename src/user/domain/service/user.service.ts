import {
  UserEntity,
  UserRepositoryInterface,
  RoleValueObject,
  NameValueObject,
} from '@root';

import { UserEntityFactory } from '../entity';

export interface CreateUserInputDTO {
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
}

export interface CreateUserOutputDTO {
  user: UserEntity;
}

export interface GetUserByEmailInputDTO {
  email: string;
}

export interface GetUserByEmailOutputDTO {
  user: UserEntity;
}

export interface GetUserByIdInputDTO {
  id: string;
}

export interface GetUserByIdOutputDTO {
  user: UserEntity;
}

export class UserService {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async createUser(input: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
    const roles = input.roles.map(
      (role) => new RoleValueObject({ name: role })
    );
    const name = new NameValueObject({
      firstName: input.firstName,
      lastName: input.lastName,
    });
    const userData = {
      name,
      email: input.email,
      roles,
    };
    const user = UserEntityFactory.create(userData);
    await this.userRepository.insert(user);
    return { user };
  }

  async getUserByEmail(
    input: GetUserByEmailInputDTO
  ): Promise<GetUserByEmailOutputDTO> {
    const user = await this.userRepository.findByEmail(input.email);
    return { user };
  }

  async getUserById(input: GetUserByIdInputDTO): Promise<GetUserByIdOutputDTO> {
    const user = await this.userRepository.findById(input.id);
    return { user };
  }
}
