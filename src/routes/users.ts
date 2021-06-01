import * as express from 'express';
import { UsersController } from '@src/controllers/users.controller';
import { authMiddleware } from '@src/middlewares/auth';
import { adminMiddleware } from '@src/middlewares/admin';

export class UsersRoutes {
  public router = express.Router();
  private controller: UsersController = new UsersController();

  constructor() {
    this.setMiddlewares();
    this.buildRoutes();
  }
  private setMiddlewares() {
    this.router.use(authMiddleware);
    this.router.use(adminMiddleware);
  }

  private buildRoutes = (): void => {
    this.router.get('/', this.controller.index);
  };
}

export default UsersRoutes;
