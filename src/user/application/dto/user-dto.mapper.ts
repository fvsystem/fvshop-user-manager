import { UserEntity } from '@root/user/domain';
import { UserDataDTO } from './user.dto';

export class UserDTOMapper {
  static toUserDataDTO(user: UserEntity): UserDataDTO {
    return {
      id: user.id,
      email: user.email,
      roles: user.roles.map((role) => role.name),
      firstName: user.name.firstName,
      lastName: user.name.lastName,
      fullName: user.name.fullName,
    };
  }
}
