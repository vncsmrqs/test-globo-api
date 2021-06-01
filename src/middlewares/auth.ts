import { Request, Response, NextFunction } from 'express';
import AuthService from '@src/services/auth';

export function authMiddleware(
  req: Partial<Request>,
  res: Partial<Response>,
  next: NextFunction
): void {
  const token = req.headers?.['x-access-token'];
  try {
    req.decoded = AuthService.decodeToken(token as string);
    next();
  } catch (e) {
    res.status?.(401).send({
      code: 401,
      message: e.message,
      name: 'InvalidTokenError',
    });
  }
}
