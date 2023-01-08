import { RepositoryInterface } from '@fvsystem/fvshop-shared-entities';
import { RoleEntity, UserEntity } from '../entity';

export interface RoleRepositoryInterface
  extends RepositoryInterface<RoleEntity> {
  findByName(name: string): Promise<RoleEntity>;
  getUsers(id: string): Promise<UserEntity[]>;
}
