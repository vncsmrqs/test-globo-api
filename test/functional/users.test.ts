describe('User functional tests', () => {
  it('should return a list of users', async () => {
    const { body, status } = await global.testRequest.get('/users');
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
