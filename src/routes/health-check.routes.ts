import * as express from "express";
import { HealthCheckController } from '@src/controllers/health-check.controller';

export class HealthCheckRoutes {
  public router = express.Router();
  private controller: HealthCheckController = new HealthCheckController();

  constructor() {
    this.buildRoutes();
  }

  private buildRoutes = (): void => {
    this.router.get('/cpu-usage', this.controller.getCpuUsage);
    this.router.get('/memory-usage', this.controller.getMemoryUsage);
    this.router.get('/cluster-status', this.controller.getClusterStatus);
  }
}

export default HealthCheckRoutes;
