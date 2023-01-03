import { UseCase } from '@fvsystem/fvshop-shared-entities';
import { UserRepositoryInterface } from '@root/user/domain';
import { UserDataDTO, UserDTOMapper } from '../dto';

export interface GetByIdInputProps {
  userId: string;
}

export interface GetByIdOutputProps {
  user: UserDataDTO;
}

export class GetByIdUseCase
  implements UseCase<GetByIdInputProps, GetByIdOutputProps>
{
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(input: GetByIdInputProps): Promise<GetByIdOutputProps> {
    const userDB = await this.userRepository.findById(input.userId);
    return { user: UserDTOMapper.toUserDataDTO(userDB) };
  }
}
