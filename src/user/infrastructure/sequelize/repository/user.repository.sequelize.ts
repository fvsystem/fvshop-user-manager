import {
  NotFoundError,
  RepositorySequelize,
} from '@fvsystem/fvshop-shared-entities';
import {
  RoleEntity,
  UserEntity,
  UserRepositoryInterface,
} from '@root/user/domain';
import { Model, ModelCtor } from 'sequelize-typescript';
import { UserBDDTO, UserBDDTOCreation } from './user.model.sequelize';
import { RoleModelSequelize } from './role.model.sequelize';
import { RoleMapper } from './role.mapper.sequelize';
import { RoleUserModelSequelize } from './role-user.model.sequelize';

export class UserRepositorySequelize
  extends RepositorySequelize<UserEntity, UserBDDTO, UserBDDTOCreation>
  implements UserRepositoryInterface
{
  constructor(
    model: ModelCtor<Model<UserBDDTO, UserBDDTOCreation>>,
    toEntity: (props: UserBDDTO) => UserEntity,
    toModel: (credential: UserEntity) => UserBDDTO
  ) {
    super(model, toEntity, toModel);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.model.findOne({
      where: { email },
      include: [{ model: RoleModelSequelize, as: 'roles' }],
    });
    if (!user) {
      throw new NotFoundError(`User with email ${email} not found`);
    }

    return this.toEntity(user.dataValues);
  }

  async bulkInsert(entities: UserEntity[]): Promise<void> {
    const transaction = await this.model.sequelize.transaction();
    try {
      await this.model.bulkCreate(
        [...entities.map((entity) => this.toModel(entity))],
        { transaction }
      );
      const relations = entities.flatMap((entity) =>
        entity.roles.map((role) => ({
          userId: entity.id,
          roleId: role.id,
        }))
      );
      await RoleUserModelSequelize.bulkCreate(relations, { transaction });
      await transaction.commit();
    } catch (error) {
      /* istanbul ignore next */
      await transaction.rollback();
    }
  }

  async insert(entity: UserEntity): Promise<void> {
    const transaction = await this.model.sequelize.transaction();
    try {
      await this.model.create(
        {
          ...this.toModel(entity),
        },
        { transaction }
      );
      const relations = entity.roles.map((role) => ({
        userId: entity.id,
        roleId: role.id,
      }));
      await RoleUserModelSequelize.bulkCreate(relations, { transaction });
      await transaction.commit();
    } catch (error) {
      /* istanbul ignore next */
      await transaction.rollback();
    }
  }

  async update(entity: UserEntity): Promise<void> {
    const user = await this.model.findByPk(entity.id);
    if (!user) {
      throw new NotFoundError(`User with id ${entity.id} not found`);
    }
    const transaction = await this.model.sequelize.transaction();
    try {
      await this.model.update(
        { ...this.toModel(entity) },
        {
          where: { id: entity.id },
          transaction,
        }
      );
      const relations = entity.roles.map((role) => ({
        userId: entity.id,
        roleId: role.id,
      }));
      await RoleUserModelSequelize.destroy({
        where: { userId: entity.id },
        transaction,
      });
      await RoleUserModelSequelize.bulkCreate(relations, { transaction });
      await transaction.commit();
    } catch (error) {
      /* istanbul ignore next */
      await transaction.rollback();
    }
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.model.findAll({
      include: [{ model: RoleModelSequelize, as: 'roles' }],
    });
    return users.map((user) => this.toEntity(user.dataValues));
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.model.findByPk(id, {
      include: [{ model: RoleModelSequelize, as: 'roles' }],
    });
    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
    return this.toEntity(user.dataValues);
  }

  async delete(id: string): Promise<void> {
    await super.delete(id);
    await RoleUserModelSequelize.destroy({ where: { userId: id } });
  }

  async getRoles(id: string): Promise<RoleEntity[]> {
    const user = await this.model.findByPk(id, {
      include: [{ model: RoleModelSequelize, as: 'roles' }],
    });
    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
    /* istanbul ignore next */
    if (!user.dataValues.roles) {
      return [];
    }
    return user.dataValues.roles.map((role) => RoleMapper.mapToEntity(role));
  }
}
