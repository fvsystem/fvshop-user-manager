import { log, UseCase } from '@fvsystem/fvshop-shared-entities';
import { UserRepositoryInterface } from '@root/user/domain';
import { UserDataDTO, UserDTOMapper } from '../dto';

export interface GetAllUsersInputProps {
  limit?: number;
  offset?: number;
}

export interface GetAllUsersOutputProps {
  users: UserDataDTO[];
}

export class GetAllUsersUseCase
  implements UseCase<GetAllUsersInputProps, GetAllUsersOutputProps>
{
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  @log('getAllUsers')
  async execute(input: GetAllUsersInputProps): Promise<GetAllUsersOutputProps> {
    const usersDB = await this.userRepository.findAll({
      limit: input.limit,
      offset: input.offset,
    });
    return {
      users: usersDB.map((userDB) => UserDTOMapper.toUserDataDTO(userDB)),
    };
  }
}
