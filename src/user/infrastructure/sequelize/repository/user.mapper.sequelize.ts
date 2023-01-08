import { UniqueEntityId } from '@fvsystem/fvshop-shared-entities';
import { NameValueObject, RoleEntity, UserEntity } from '@root/user/domain';
import { UserBDDTO } from './user.model.sequelize';

export class UserMapper {
  public static mapToEntity(user: UserBDDTO): UserEntity {
    /* istanbul ignore next */
    if (!user.roles) {
      throw new Error('User roles are required');
    }
    const name = new NameValueObject({
      firstName: user.firstName,
      lastName: user.lastName,
    });

    const roles = user.roles.map(
      (role) => new RoleEntity({ name: role.name }, role.id)
    );
    return new UserEntity(
      { name, email: user.email, roles },
      new UniqueEntityId(user.id)
    );
  }

  public static mapToModel(user: UserEntity): UserBDDTO {
    return {
      id: user.id,
      firstName: user.name.firstName,
      lastName: user.name.lastName,
      email: user.email,
      roles: user.roles.map((role) => ({
        id: role.id,
        name: role.name,
      })),
    };
  }
}
