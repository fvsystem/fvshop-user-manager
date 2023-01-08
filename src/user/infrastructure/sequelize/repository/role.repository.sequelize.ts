import {
  NotFoundError,
  RepositorySequelize,
  UniqueEntityId,
} from '@fvsystem/fvshop-shared-entities';
import { Optional } from 'sequelize';
import { RoleEntity, UserEntity } from '@root/user/domain';
import { RoleRepositoryInterface } from '@root/user/domain/repository/role.repository.interface';
import { Model, ModelCtor } from 'sequelize-typescript';
import {
  RoleBDDTO,
  RoleBDDTOCreation,
  RoleModelSequelize,
} from './role.model.sequelize';
import { UserMapper } from './user.mapper.sequelize';
import { UserModelSequelize } from './user.model.sequelize';
import { RoleUserModelSequelize } from './role-user.model.sequelize';

export class RoleRepositorySequelize
  extends RepositorySequelize<
    RoleEntity,
    Optional<RoleBDDTO, 'users'>,
    RoleBDDTOCreation
  >
  implements RoleRepositoryInterface
{
  constructor(
    model: ModelCtor<Model<RoleBDDTO>>,
    toEntity: (props: RoleBDDTO) => RoleEntity,
    toModel: (credential: RoleEntity) => RoleBDDTO
  ) {
    super(model, toEntity, toModel);
  }

  async findByName(name: string): Promise<RoleEntity> {
    const role = await this.model.findOne({ where: { name } });
    if (!role) {
      throw new NotFoundError(`Role with name ${name} not found`);
    }
    return this.toEntity(role.dataValues);
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    const idValue = id instanceof UniqueEntityId ? id.value : id;
    await super.delete(idValue);
    await RoleUserModelSequelize.destroy({ where: { roleId: idValue } });
  }

  async getUsers(id: string): Promise<UserEntity[]> {
    const role = await this.model.findByPk(id, {
      include: [
        {
          model: UserModelSequelize,
          as: 'users',
          include: [{ model: RoleModelSequelize, as: 'roles' }],
        },
      ],
    });
    if (!role) {
      throw new NotFoundError(`Role with id ${id} not found`);
    }

    /* istanbul ignore next */
    if (!role.dataValues.users) {
      return [];
    }

    return role.dataValues.users.map((user) => UserMapper.mapToEntity(user));
  }
}
