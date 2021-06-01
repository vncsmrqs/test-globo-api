import { InternalError } from '@src/utils/errors/internal-error';
import { User, comparePasswords } from '@src/models/user';

export interface AuthenticatedUser {
  email: string;
  accessLevel: string;
}

export class InvalidCredentialsError extends InternalError {
  constructor(message = '') {
    const internalMessage = 'Invalid Credentials';
    super(`${internalMessage}${message ? ': ' + message : ''}`);
    this.code = 401;
  }
}

export class Auth {
  public static async authenticate(
    email: string,
    password: string
  ): Promise<AuthenticatedUser> {
    const user = User.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const validPassword = await comparePasswords(password, user.password);

    if (!validPassword) {
      throw new InvalidCredentialsError();
    }

    return {
      email: user.email,
      accessLevel: user.accessLevel,
    };
  }
}

export default Auth;
