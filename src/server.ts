import './utils/module-alias';
import express, { Application } from 'express';
import cors from 'cors';
import config from 'config';

import { HealthCheckRoutes } from '@src/routes/health-check.routes';
import AuthRoutes from '@src/routes/auth';
import UsersRoutes from '@src/routes/users';

export class SetupServer {
  readonly port;
  readonly app: Application;

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
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.info('Server listening on port: ' + this.port);
    });
  }

  private setupExpress(): void {
    this.setupCors();
    this.app.use(express.json());
  }

  private setupRoutes() {
    const healthCheckRoutes = new HealthCheckRoutes();
    const authRoutes = new AuthRoutes();
    const usersRoutes = new UsersRoutes();
    this.app.use('/health-check', healthCheckRoutes.router);
    this.app.use('/auth', authRoutes.router);
    this.app.use('/users', usersRoutes.router);
  }

  private setupCors() {
    const allowedOrigins = config.get<Array<string>>('App.cors.allowedOrigins');
    const options: cors.CorsOptions = {
      origin: allowedOrigins
    };
    this.app.use(cors(options));
  }
}
