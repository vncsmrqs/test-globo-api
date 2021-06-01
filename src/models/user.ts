import usersFixtures from '@test/fixtures/users_fixture.json';
import bcrypt from 'bcrypt';

interface IUser {
  email: string;
  accessLevel: string;
  password: string;
}

export class User {
  public static findAll(): IUser[] {
    return usersFixtures;
  }

  public static findByEmail(email: string): IUser | undefined {
    return usersFixtures.find((user) => user.email === email);
  }
}

export async function hashPassword(
  password: string,
  salt = 10
): Promise<string> {
  return await bcrypt.hash(password, salt);
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}
