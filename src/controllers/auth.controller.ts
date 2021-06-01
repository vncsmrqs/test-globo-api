import { Request, Response } from 'express';
import AuthService from '@src/services/auth';

export class AuthController {
  public signIn = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      const authenticatedUser = await AuthService.authenticate(email, password);

      res.json(authenticatedUser).status(200);
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

export default AuthController;
