import { Request, Response } from 'express';
import AuthService from '@src/services/auth';

export class AuthController {
  public signIn = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      const authToken = await AuthService.authenticate(email, password);

      res.status(200).json(authToken);
    } catch (e) {
      res.status(e.code).json({
        message: e.message,
        name: e.name,
        code: e.code,
      });
    }
  };
}

export default AuthController;
