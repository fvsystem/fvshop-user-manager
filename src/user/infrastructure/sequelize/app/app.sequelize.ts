import { ConfigShared } from '@root/user/infrastructure/config';
import { Sequelize } from 'sequelize-typescript';
import {
  UserModelSequelize,
  RoleUserModelSequelize,
  RoleModelSequelize,
} from '../repository';

export async function getAppSequelize(config: ConfigShared): Promise<void> {
  const sequelize = new Sequelize({
    dialect: config.db.vendor,
    host: config.db.host,
    logging: config.db.logging,
    password: config.db.password,
    port: config.db.port,
    username: config.db.username,
    database: 'fvshop',
    models: [UserModelSequelize, RoleUserModelSequelize, RoleModelSequelize],
  });
  console.log('sequelize', sequelize);

  await sequelize.sync();
}
