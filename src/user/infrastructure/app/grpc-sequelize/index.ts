/* istanbul ignore file */
import * as grpc from '@grpc/grpc-js';
import { CredentialFacadeImplGrpc } from '@fvsystem/fvshop-identity';
import { LoggerServiceWinton } from '@fvsystem/fvshop-shared-entities';
import { makeConfigShared } from '../../config';
import { getAppGrpc } from '../../grpc';
import {
  getAppSequelize,
  UserMapper,
  UserModelSequelize,
  UserRepositorySequelize,
} from '../../sequelize';

const logger = new LoggerServiceWinton();
// init server
(async () => {
  const config = makeConfigShared();
  await getAppSequelize(config);
  const userRepository = new UserRepositorySequelize(
    UserModelSequelize,
    UserMapper.mapToEntity,
    UserMapper.mapToModel
  );

  const credentialFacade = new CredentialFacadeImplGrpc(
    config.credentialFacade.domain,
    config.credentialFacade.port
  );

  const app = getAppGrpc(userRepository, credentialFacade);
  const { server } = app;

  server.bindAsync(
    `${config.domain.domain}:${config.grpc.port}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        logger.error(err);
        process.exit(1);
      }
      server.start();
      logger.info(`Server running on port ${port}`);
    }
  );
})();
