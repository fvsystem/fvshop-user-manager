/* eslint-disable no-underscore-dangle */
import { UserFacadeImpl } from '@root/user/application';
import { UserRepositoryInterface } from '@root/user/domain';
import { Router } from 'express';

export class RoutesExpressUser {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  addRoutes(router: Router) {
    const userFacade = new UserFacadeImpl(this.userRepository);

    router.get('/user/mail', async (req, res) => {
      const { email } = req.query;
      try {
        const result = await userFacade.getUserByEmail.execute({
          email: email as string,
        });
        res.status(200).json(result);
      } catch (err) {
        res.status(400).json(err);
      }
    });

    router.get('/user/:id', async (req, res) => {
      const { id } = req.params;
      try {
        const result = await userFacade.getUserById.execute({
          userId: id,
        });
        res.status(200).json(result);
      } catch (err) {
        res.status(400).json(err);
      }
    });
  }
}
