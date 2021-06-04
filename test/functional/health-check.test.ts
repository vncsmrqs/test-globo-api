import healthNormalizedFixture from '@test/fixtures/health_normalized_fixture.json';
import AuthService from "@src/services/auth";

describe('Health check functional tests', () => {
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

    it('should a health normalized data', async () => {
      const { body, status } = await global.testRequest
        .get('/health-check')
        .set({ 'x-access-token': token });
      expect(status).toBe(200);
      expect(body).toEqual(healthNormalizedFixture);
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

    it('should a health normalized data', async () => {
      const { body, status } = await global.testRequest
        .get('/health-check')
        .set({ 'x-access-token': token });
      expect(status).toBe(200);
      expect(body).toEqual(healthNormalizedFixture);
    });
  });
});
