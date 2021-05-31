import { Request, Response } from 'express';
import { HealthCheck, HealthMetrics } from '@src/services/health-check';

export class HealthCheckController {
  public index = async (req: Request, res: Response): Promise<void> => {
    try {
      const healthCheck = new HealthCheck();
      const healthMetrics: HealthMetrics = await healthCheck.getHealthMetrics();

      res.json(healthMetrics).status(200);
    } catch (e) {
      res
        .json({
          message: e.message,
          name: e.name,
          code: e.code,
        })
        .status(e.code);
    }
  };
}

export default HealthCheckController;
