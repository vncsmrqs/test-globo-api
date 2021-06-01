import * as express from 'express';
import { UsersController } from "@src/controllers/users.controller";

export class UsersRoutes {
  public router = express.Router();
  private controller: UsersController = new UsersController();

  constructor() {
    this.buildRoutes();
  }

  private buildRoutes = (): void => {
    this.router.get('/', this.controller.index);
  };
}

export default UsersRoutes;
