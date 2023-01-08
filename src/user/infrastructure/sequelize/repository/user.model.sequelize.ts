import { UserDataDTO } from '@root/user/application';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { RoleUserModelSequelize } from './role-user.model.sequelize';
import { RoleBDDTO, RoleModelSequelize } from './role.model.sequelize';

export type UserBDDTOCreation = Omit<UserDataDTO, 'fullName' | 'roles'>;

export interface UserBDDTO extends UserBDDTOCreation {
  roles?: RoleBDDTO[];
}

@Table({ tableName: 'users' })
export class UserModelSequelize extends Model<UserBDDTO, UserBDDTOCreation> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column({ allowNull: false, type: DataType.STRING(255), unique: true })
  declare email: string;

  @Column({ allowNull: false, type: DataType.STRING(255), field: 'first_name' })
  declare firstName: string;

  @Column({ allowNull: false, type: DataType.STRING(255), field: 'last_name' })
  declare lastName: string;

  @BelongsToMany(() => RoleModelSequelize, () => RoleUserModelSequelize)
  roles: RoleModelSequelize[];
}
