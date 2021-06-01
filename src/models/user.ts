import usersFixtures from '@test/fixtures/users_fixture.json';

interface IUser {
  email: string,
  accessLevel: string,
  password: string,
}

export class User {
  public static findAll(): IUser[] {
    return usersFixtures;
  }

  public static findByEmail(email: string): IUser | undefined {
    return usersFixtures.find((user) => user.email === email);
  }
}
