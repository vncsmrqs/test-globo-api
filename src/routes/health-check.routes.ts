import * as express from 'express';
import HealthCheckController from '@src/controllers/health-check.controller';
import { authMiddleware } from '@src/middlewares/auth';

export class HealthCheckRoutes {
  public router = express.Router();
  private controller: HealthCheckController = new HealthCheckController();

  constructor() {
    this.setMiddlewares();
    this.buildRoutes();
  }

  private setMiddlewares() {
    this.router.use(authMiddleware);
  }

  private buildRoutes = (): void => {
    this.router.get('/', this.controller.index);
  };
}

export default HealthCheckRoutes;
