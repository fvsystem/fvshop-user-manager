import axios from 'axios';

import {
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
    const response = await axios.get(`${this.domain}/user/mail`, {
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
    const response = await axios.get(`${this.domain}/user/${input.userId}`);
    return response.data;
  }
}

export class UserFacadeImpleRest implements UserFacadeInterface {
  getUserByEmail: UseCase<GetByEmailInputProps, GetByEmailOutputProps>;

  getUserById: UseCase<GetByIdInputProps, GetByIdOutputProps>;

  constructor(domain: string) {
    this.getUserByEmail = new GetByEmailUseCaseRest(domain);
    this.getUserById = new GetByIdUseCaseRest(domain);
  }
}
