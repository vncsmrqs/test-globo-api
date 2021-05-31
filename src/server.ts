import './utils/module-alias';
import express, { Application } from 'express';

import { HealthCheckRoutes } from '@src/routes/health-check.routes';

export class SetupServer {
  private port;
  private app: Application;

  constructor(port = 3000) {
    this.port = port;
    this.app = express();
  }

  public getApp(): Application {
    return this.app;
  }

  public init(): void {
    this.setupExpress();
    this.setupRoutes();

    this.app.listen(this.port);
  }

  private setupExpress(): void {
    this.app.use(express.json());
  }

  private setupRoutes() {
    const healthCheckRoutes = new HealthCheckRoutes();
    this.app.use('/health-check', healthCheckRoutes.router);
  }
}
