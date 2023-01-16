/* eslint-disable no-underscore-dangle */
import CredentialFacade, { checkTokenExpress } from '@fvsystem/fvshop-identity';
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
    }>,
    private readonly credentialFacade: CredentialFacade
  ) {}

  addRoutes(router: Router) {
    const userFacade = new UserFacadeImpl(
      this.userRepository,
      this.credentialFacade
    );

    router.get('/health', (req, res) => {
      res.status(200).json({ message: 'OK' });
    });

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

    router.post(
      '/users',
      checkTokenExpress(['admin', 'users-admin'], this.jwtService),
      async (req, res) => {
        const { firstName, lastName, email, password, roles } = req.body;
        try {
          const result = await userFacade.createUser.execute({
            firstName,
            lastName,
            email,
            password,
            roles,
          });
          res.status(201).json(result);
        } catch (err) {
          res.status(400).json(err);
        }
      }
    );
  }
}
