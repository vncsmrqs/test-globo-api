import { InternalError } from '@src/utils/errors/internal-error';
import { User } from '@src/models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from 'config';

export interface AuthenticatedUser {
  email: string;
  accessLevel: string;
}

export interface DecodedUser extends AuthenticatedUser {
  iat: number;
  exp: number;
}

export interface AuthToken {
  token: string;
}

export class InvalidCredentialsError extends InternalError {
  constructor(message = '') {
    const internalMessage = 'Invalid Credentials';
    super(`${internalMessage}${message ? ': ' + message : ''}`, 401);
  }
}

export class AuthService {
  public static async authenticate(
    email: string,
    password: string
  ): Promise<AuthToken> {
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

    const authenticatedUser = {
      email: user.email,
      accessLevel: user.accessLevel,
    };

    return {
      token: AuthService.generateToken(authenticatedUser),
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

  public static generateToken(authenticatedUser: AuthenticatedUser): string {
    return jwt.sign(authenticatedUser, config.get('App.auth.secretKey'), {
      expiresIn: config.get('App.auth.expiresIn'),
    });
  }

  public static decodeToken(token: string): DecodedUser {
    return jwt.verify(token, config.get('App.auth.secretKey')) as DecodedUser;
  }
}

export default AuthService;
