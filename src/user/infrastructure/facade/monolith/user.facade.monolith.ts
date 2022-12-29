import {
  UserEntity,
  UserFacadeInterface,
  UserRepositoryInterface,
  UserService,
} from '@root/user/domain';

export class UserFacadeMonolith implements UserFacadeInterface {
  private readonly userRepository: UserRepositoryInterface;

  private readonly userEntity: UserService;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
    this.userEntity = new UserService(userRepository);
  }

  async findById(id: string): Promise<UserEntity> {
    const { user } = await this.userEntity.getUserById({ id });
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const { user } = await this.userEntity.getUserByEmail({ email });
    return user;
  }
}
