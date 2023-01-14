import { JWTServicesInterface } from '@fvsystem/fvshop-shared-entities';
import { UserRepositoryInterface } from '@root/user/domain';
import express, { Router, Express } from 'express';

import { RoutesExpressUser } from '../router';

export function getAppExpress(
  userRepository: UserRepositoryInterface,
  jwtService: JWTServicesInterface<{
    email: string;
    userId: string;
    scope: string[];
  }>
): Express {
  const app = express();
  const routes = Router();
  const routesExpressIdentity = new RoutesExpressUser(
    userRepository,
    jwtService
  );

  app.use(express.json());
  routesExpressIdentity.addRoutes(routes);
  app.use(routes);
  return app;
}
