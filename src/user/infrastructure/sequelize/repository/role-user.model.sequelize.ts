import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { RoleModelSequelize } from './role.model.sequelize';
import { UserModelSequelize } from './user.model.sequelize';

export type RoleUserBDDTO = {
  userId: string;
  roleId: string;
};

@Table({ tableName: 'roles-users' })
export class RoleUserModelSequelize extends Model<
  RoleUserBDDTO,
  RoleUserBDDTO
> {
  @ForeignKey(() => UserModelSequelize)
  @Column({ type: DataType.UUID, field: 'user_id' })
  declare userId: string;

  @ForeignKey(() => RoleModelSequelize)
  @Column({ type: DataType.UUID, field: 'role_id' })
  declare roleId: string;
}
