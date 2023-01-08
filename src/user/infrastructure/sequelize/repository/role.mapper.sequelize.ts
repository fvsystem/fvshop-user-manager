import { RoleDataDTO } from '@root/user/application/dto/role.dto';
import { RoleEntity } from '@root/user/domain';
import { RoleBDDTO } from './role.model.sequelize';

export class RoleMapper {
  public static mapToEntity(role: RoleDataDTO): RoleEntity {
    return new RoleEntity({ name: role.name }, role.id);
  }

  public static mapToModel(role: RoleEntity): RoleBDDTO {
    return {
      id: role.id,
      name: role.name,
    };
  }
}
