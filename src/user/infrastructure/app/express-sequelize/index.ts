/* istanbul ignore file */
import { LoggerServiceWinton } from '@fvsystem/fvshop-shared-entities';
import { makeConfigShared } from '../../config';
import { getAppExpress } from '../../express';
import {
  getAppSequelize,
  UserMapper,
  UserModelSequelize,
  UserRepositorySequelize,
} from '../../sequelize';

const logger = new LoggerServiceWinton();
// init server
(async () => {
  const config = makeConfigShared(
    process.env.FILE_ENV || '../../../../../.env'
  );
  await getAppSequelize(config);
  const userRepository = new UserRepositorySequelize(
    UserModelSequelize,
    UserMapper.mapToEntity,
    UserMapper.mapToModel
  );
  const app = getAppExpress(userRepository);
  app.listen(config.rest.port || 3000, () => {
    logger.info(`Server running on port ${config.rest.port || 3000}`);
  });
})();
