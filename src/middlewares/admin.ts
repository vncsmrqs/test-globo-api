import { Request, Response, NextFunction } from 'express';

export function adminMiddleware(
  req: Partial<Request>,
  res: Partial<Response>,
  next: NextFunction
): void {
  if (req.decoded?.accessLevel === 'administrador') {
    next();
    return;
  }
  res.status?.(403).send({
    code: 403,
    name: 'PermissionDeniedError',
    message: 'Permission denied',
  });
}
