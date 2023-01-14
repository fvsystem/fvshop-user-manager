/* istanbul ignore file */
import { CredentialFacadeImplGrpc } from '@fvsystem/fvshop-identity';
import {
  JWTServiceJsonWebToken,
  LoggerServiceWinton,
} from '@fvsystem/fvshop-shared-entities';
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
  const config = makeConfigShared();
  await getAppSequelize(config);
  const userRepository = new UserRepositorySequelize(
    UserModelSequelize,
    UserMapper.mapToEntity,
    UserMapper.mapToModel
  );
  const jwtService = new JWTServiceJsonWebToken<{
    email: string;
    userId: string;
    scope: string[];
  }>({
    algorithm: 'RS256',
    publicKey: config.jwt.publicKey,
    expiration: '1h',
  });

  const credentialFacade = new CredentialFacadeImplGrpc(
    config.credentialFacade.domain,
    config.credentialFacade.port
  );

  const app = getAppExpress(userRepository, jwtService, credentialFacade);
  app.listen(config.rest.port || 3000, () => {
    logger.info(`Server running on port ${config.rest.port || 3000}`);
  });
})();
