import { log, UseCase } from '@fvsystem/fvshop-shared-entities';
import { UserRepositoryInterface, UserService } from '@root/user/domain';
import { CredentialFacade } from '@fvsystem/fvshop-identity';
import { UserDataDTO, UserDTOMapper } from '../dto';

export interface CreateUserInputProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: string[];
}

export interface CreateUserOutputProps {
  user: UserDataDTO;
}

export class CreateUserUseCase
  implements UseCase<CreateUserInputProps, CreateUserOutputProps>
{
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly credentialFacade: CredentialFacade
  ) {}

  @log('createUser')
  async execute(input: CreateUserInputProps): Promise<CreateUserOutputProps> {
    const service = new UserService(this.userRepository);

    const { user } = await service.createUser(input);

    try {
      await this.credentialFacade.createCredential.execute({
        email: input.email,
        password: input.password,
        userId: user.id,
      });
    } catch (error) {
      await this.userRepository.delete(user.id);
      throw error;
    }

    return {
      user: UserDTOMapper.toUserDataDTO(user),
    };
  }
}
