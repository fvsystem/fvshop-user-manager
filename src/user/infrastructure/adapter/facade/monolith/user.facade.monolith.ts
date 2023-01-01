import { UserRepositoryInterface, UserService } from '@root/user/domain';

import { UserFacadeInterface } from '@root/user/application';

export class UserFacadeMonolith implements UserFacadeInterface {
  private readonly userRepository: UserRepositoryInterface;

  private readonly userEntity: UserService;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
    this.userEntity = new UserService(userRepository);
  }

  async getRolesFromEmail(email: string): Promise<string[]> {
    const { user } = await this.userEntity.getUserByEmail({ email });
    return user.roles.map((role) => role.name);
  }
}
