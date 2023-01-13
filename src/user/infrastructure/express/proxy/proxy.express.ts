import axios from 'axios';

import {
  GetAllUsersInputProps,
  GetAllUsersOutputProps,
  GetAllUsersUseCase,
  GetByEmailInputProps,
  GetByEmailOutputProps,
  GetByIdInputProps,
  GetByIdOutputProps,
  UserFacadeInterface,
} from '@root/user/application';
import { UseCase } from '@fvsystem/fvshop-shared-entities';

export class GetByEmailUseCaseRest {
  constructor(private readonly domain: string) {
    this.domain = domain;
  }

  async execute(input: GetByEmailInputProps): Promise<GetByEmailOutputProps> {
    const response = await axios.get(`${this.domain}/users`, {
      params: input,
    });
    return response.data;
  }
}

export class GetAllUsersUseCaseRest {
  constructor(private readonly domain: string) {
    this.domain = domain;
  }

  async execute(input: GetAllUsersInputProps): Promise<GetAllUsersOutputProps> {
    const response = await axios.get(`${this.domain}/users`, {
      params: input,
    });
    return response.data;
  }
}

export class GetByIdUseCaseRest {
  constructor(private readonly domain: string) {
    this.domain = domain;
  }

  async execute(input: GetByIdInputProps): Promise<GetByIdOutputProps> {
    const response = await axios.get(`${this.domain}/users/${input.userId}`);
    return response.data;
  }
}

export class UserFacadeProxyExpress implements UserFacadeInterface {
  getUserByEmail: UseCase<GetByEmailInputProps, GetByEmailOutputProps>;

  getUserById: UseCase<GetByIdInputProps, GetByIdOutputProps>;

  getAllUsers: UseCase<GetAllUsersInputProps, GetAllUsersOutputProps>;

  constructor(domain: string) {
    this.getUserByEmail = new GetByEmailUseCaseRest(domain);
    this.getUserById = new GetByIdUseCaseRest(domain);
    this.getAllUsers = new GetAllUsersUseCaseRest(domain);
  }
}
