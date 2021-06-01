import { InternalError } from '@src/utils/errors/internal-error';

import usersFixtures from '@test/fixtures/users_fixture.json';

export interface AuthenticatedUser {
  email: string;
  nivel_acesso: string;
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
    const authenticatedUser = usersFixtures.find(
      (user) => user.email === email && user.senha === password
    );

    if (!authenticatedUser) {
      throw new InvalidCredentialsError();
    }

    return {
      email: authenticatedUser.email,
      nivel_acesso: authenticatedUser.nivel_acesso,
    };
  }
}

export default Auth;
