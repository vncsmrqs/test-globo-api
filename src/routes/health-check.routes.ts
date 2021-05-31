import * as express from 'express';
import HealthCheckController from '@src/controllers/health-check.controller';

export class HealthCheckRoutes {
  public router = express.Router();
  private controller: HealthCheckController = new HealthCheckController();

  constructor() {
    this.buildRoutes();
  }

  private buildRoutes = (): void => {
    this.router.get('/', this.controller.index);
  };
}

export default HealthCheckRoutes;
