import { RepositoryInterface } from '@fvsystem/fvshop-shared-entities';
import { UserEntity } from '@root';

export interface UserRepositoryInterface
  extends RepositoryInterface<UserEntity> {
  findByEmail(email: string): Promise<UserEntity>;
}
