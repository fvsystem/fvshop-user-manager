import { UserRepositoryInterface } from '@root/user/domain';
import express, { Router, Express } from 'express';

import { RoutesExpressUser } from '../router';

export function getAppExpress(
  userRepository: UserRepositoryInterface
): Express {
  const app = express();
  const routes = Router();
  const routesExpressIdentity = new RoutesExpressUser(userRepository);

  app.use(express.json());
  routesExpressIdentity.addRoutes(routes);
  app.use(routes);
  return app;
}
