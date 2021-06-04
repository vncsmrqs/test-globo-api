import AuthService from "@src/services/auth";

describe('User functional tests', () => {
  describe('When user is unauthenticated', () => {
    it('should return an unauthenticated error', async () => {
      const { body, status } = await global.testRequest
        .get('/health-check');
      expect(status).toBe(401);
      expect(body).toEqual({
        code: 401,
        message: "jwt must be provided",
        name: "InvalidTokenError",
      });
    });
  });

  describe('When user is authenticated as funcionario', () => {
    const defaultUser = {
      email: 'usuariocomum@teste.com.br',
      accessLevel: 'funcionario',
    };

    let token: string;

    beforeEach(async () => {
      token = AuthService.generateToken(defaultUser);
    });

    it('should return an unauthorized error', async () => {
      const { body, status } = await global.testRequest.get('/users').set({ 'x-access-token': token });
      expect(status).toBe(403);
      expect(body).toEqual({
        code: 403,
        name: 'PermissionDeniedError',
        message: 'Permission denied',
      });
    });
  });

  describe('When user is authenticated as administrador', () => {
    const defaultUser = {
      email: 'usuarioadm@teste.com.br',
      accessLevel: 'administrador',
    };

    let token: string;

    beforeEach(async () => {
      token = AuthService.generateToken(defaultUser);
    });

    it('should return a list of users', async () => {
      const { body, status } = await global.testRequest.get('/users').set({ 'x-access-token': token });
      expect(status).toBe(200);
      expect(body).toEqual([
        {
          email: 'usuariocomum@teste.com.br',
          accessLevel: 'funcionario',
        },
        {
          email: 'usuarioadm@teste.com.br',
          accessLevel: 'administrador',
        },
      ]);
    });
  });

  describe('When authenticating a user', () => {
    it('should generate a token for a valid user', async () => {
      const { body, status } = await global.testRequest
        .post('/auth/sign-in')
        .send({
          email: 'usuariocomum@teste.com.br',
          password: '12345678',
        });
      expect(status).toBe(200);
      expect(body).toEqual(
        expect.objectContaining({ token: expect.any(String) })
      );
    });

    it('should get an error when for a invalid user', async () => {
      const { body, status } = await global.testRequest
        .post('/auth/sign-in')
        .send({
          email: 'usuarioadm@teste.com.br',
          password: '11111111',
        });

      expect(status).toBe(401);
      expect(body).toEqual(
        expect.objectContaining({ message: 'Invalid Credentials' })
      );
    });
  });
});
