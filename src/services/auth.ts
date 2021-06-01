import { InternalError } from '@src/utils/errors/internal-error';
import { User } from '@src/models/user';
import bcrypt from 'bcrypt';

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

export class AuthService {
  public static async authenticate(
    email: string,
    password: string
  ): Promise<AuthenticatedUser> {
    const user = User.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const validPassword = await AuthService.comparePasswords(
      password,
      user.password
    );

    if (!validPassword) {
      throw new InvalidCredentialsError();
    }

    return {
      email: user.email,
      accessLevel: user.accessLevel,
    };
  }

  public static async hashPassword(
    password: string,
    salt = 10
  ): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  public static async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}

export default AuthService;
