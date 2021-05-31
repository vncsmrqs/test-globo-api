import { Request, Response } from "express";

export class HealthCheckController {
  public getCpuUsage = (req: Request, res: Response): void => {
    try {
      res.json({
        "labels": [
          "13:24",
          "13:29",
          "13:34",
          "13:39",
          "13:44",
          "13:49",
          "13:54",
          "13:59",
          "14:04",
          "14:09",
          "14:14",
          "14:19"
        ],
        "data": [
          30,
          60,
          30,
          30,
          50,
          80,
          60,
          50,
          30,
          30,
          50,
          30
        ]
      }).status(200);
    } catch (error) {
      res.json().status(400);
    }
  }

  public getMemoryUsage = (req: Request, res: Response): void => {
    try {
      res.json({
        "labels": [
          "13:24",
          "13:29",
          "13:34",
          "13:39",
          "13:44",
          "13:49",
          "13:54",
          "13:59",
          "14:04",
          "14:09",
          "14:14",
          "14:19"
        ],
        "data": [
          59.5,
          59.6,
          59.7,
          59.900000000000006,
          60.2,
          60.400000000000006,
          60.5,
          60.7,
          60.800000000000004,
          60.900000000000006,
          61,
          61.2
        ]
      }).status(200);
    } catch (error) {
      res.json().status(400);
    }
  };

  public getClusterStatus = (req: Request, res: Response): void => {
    try {
      res.json({
        "status": "green"
      }).status(200);
    } catch (error) {
      res.json().status(400);
    }
  }
}

export default HealthCheckController;
