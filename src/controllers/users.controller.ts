import { Request, Response } from 'express';
import { User } from '@src/models/user';

export class UsersController {
  public index = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await User.findAll().map((user) => ({
        email: user.email,
        accessLevel: user.accessLevel,
      }));
      res.status(200).json(users);
    } catch (e) {
      res.status(e.code).json({
        message: e.message,
        name: e.name,
        code: e.code,
      });
    }
  };
}

export default UsersController;
