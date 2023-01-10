import { ConfigShared } from '@root/user/infrastructure/config';
import { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import {
  UserModelSequelize,
  RoleUserModelSequelize,
  RoleModelSequelize,
} from '../repository';

export async function getAppSequelize(config: ConfigShared): Promise<void> {
  const dialect = config.db.vendor as Dialect;
  const sequelize = new Sequelize({
    dialect,
    host: config.db.host,
    logging: config.db.logging,
    password: config.db.password,
    port: config.db.port,
    username: config.db.username,
    database: 'fvshop',
    models: [UserModelSequelize, RoleUserModelSequelize, RoleModelSequelize],
  });

  await sequelize.sync();
}
