import { UseCase } from '@fvsystem/fvshop-shared-entities';
import { UserRepositoryInterface } from '@root/user/domain';
import { UserDataDTO, UserDTOMapper } from '../dto';

export interface GetByEmailInputProps {
  email: string;
}

export interface GetByEmailOutputProps {
  user: UserDataDTO;
}

export class GetByEmailUseCase
  implements UseCase<GetByEmailInputProps, GetByEmailOutputProps>
{
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(input: GetByEmailInputProps): Promise<GetByEmailOutputProps> {
    const userDB = await this.userRepository.findByEmail(input.email);
    return { user: UserDTOMapper.toUserDataDTO(userDB) };
  }
}
