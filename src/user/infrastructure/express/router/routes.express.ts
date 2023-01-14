/* eslint-disable no-underscore-dangle */
import { checkTokenExpress } from '@fvsystem/fvshop-identity';
import { JWTServicesInterface } from '@fvsystem/fvshop-shared-entities';
import { UserFacadeImpl } from '@root/user/application';
import { UserRepositoryInterface } from '@root/user/domain';
import { Router } from 'express';

export class RoutesExpressUser {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly jwtService: JWTServicesInterface<{
      email: string;
      userId: string;
      scope: string[];
    }>
  ) {}

  addRoutes(router: Router) {
    const userFacade = new UserFacadeImpl(this.userRepository);

    router.get(
      '/users',
      checkTokenExpress(['admin', 'users-admin'], this.jwtService),
      async (req, res) => {
        const { email, limit, offset } = req.query;
        if (!email) {
          try {
            const result = await userFacade.getAllUsers.execute({
              limit: limit ? Number(limit) : undefined,
              offset: offset ? Number(offset) : undefined,
            });
            res.status(200).json(result);
          } catch (err) {
            res.status(400).json(err);
          }
          return;
        }

        try {
          const result = await userFacade.getUserByEmail.execute({
            email: email as string,
          });
          res.status(200).json(result);
        } catch (err) {
          res.status(400).json(err);
        }
      }
    );

    router.get(
      '/users/:id',
      checkTokenExpress(['admin', 'users-admin', 'user'], this.jwtService),
      async (req, res) => {
        const { id } = req.params;
        const { user } = req;

        if (
          !user ||
          (!user.roles.includes('admin') && !user.roles.includes('users-admin'))
        ) {
          if (user?.id !== id) {
            res.status(403).json({ message: 'Forbidden' });
            return;
          }
        }
        try {
          const result = await userFacade.getUserById.execute({
            userId: id,
          });
          res.status(200).json(result);
        } catch (err) {
          res.status(400).json(err);
        }
      }
    );
  }
}
