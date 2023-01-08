/* istanbul ignore file */

import {
  NotFoundError,
  UniqueEntityId,
} from '@fvsystem/fvshop-shared-entities';
import { RoleEntity, UserEntity } from '../entity';
import { UserRepositoryInterface } from './user.repository.interface';

export class UserRepositoryMock implements UserRepositoryInterface {
  constructor(public user: UserEntity) {}

  sortableFields: string[] = ['email'];

  async findByEmail(email: string): Promise<UserEntity> {
    if (email === 'noUser') {
      throw new NotFoundError('User not found');
    }
    return this.user;
  }

  async getRoles(id: string): Promise<RoleEntity[]> {
    return this.user.roles;
  }

  async insert(entity: UserEntity): Promise<void> {
    console.log('inserted');
  }

  async bulkInsert(entities: UserEntity[]): Promise<void> {
    console.log('bulk inserted');
  }

  async findById(id: string | UniqueEntityId): Promise<UserEntity> {
    if (id === 'noUser') {
      throw new NotFoundError('User not found');
    }
    return this.user;
  }

  async findAll(): Promise<UserEntity[]> {
    return [this.user];
  }

  async update(entity: UserEntity): Promise<void> {
    console.log('updated');
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    console.log('deleted');
  }
}
