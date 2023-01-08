import { Optional } from 'sequelize';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { RoleUserModelSequelize } from './role-user.model.sequelize';
import { UserBDDTO, UserModelSequelize } from './user.model.sequelize';

export type RoleBDDTOCreation = {
  id: string;
  name: string;
};

export interface RoleBDDTO extends RoleBDDTOCreation {
  users?: UserBDDTO[];
}

@Table({ tableName: 'roles' })
export class RoleModelSequelize extends Model<
  Optional<RoleBDDTO, 'users'>,
  RoleBDDTOCreation
> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column({ allowNull: false, type: DataType.STRING(255), unique: true })
  declare name: string;

  @BelongsToMany(() => UserModelSequelize, () => RoleUserModelSequelize)
  declare users: UserModelSequelize[];
}
