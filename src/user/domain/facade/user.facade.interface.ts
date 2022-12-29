import { UserEntity } from '../entity';

export interface UserFacadeInterface {
  findById(id: string): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
}
