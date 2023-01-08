import { RepositoryInterface } from '@fvsystem/fvshop-shared-entities';
import { RoleEntity, UserEntity } from '../entity';

export interface UserRepositoryInterface
  extends RepositoryInterface<UserEntity> {
  findByEmail(email: string): Promise<UserEntity>;
  getRoles(id: string): Promise<RoleEntity[]>;
}
