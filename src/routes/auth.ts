import * as express from 'express';
import AuthController from '@src/controllers/auth.controller';

export class AuthRoutes {
  public router = express.Router();
  private controller: AuthController = new AuthController();

  constructor() {
    this.buildRoutes();
  }

  private buildRoutes = (): void => {
    this.router.post('/sign-in', this.controller.signIn);
  };
}

export default AuthRoutes;
