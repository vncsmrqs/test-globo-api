describe('User functional tests', () => {
  it('should return a list of users', async () => {
    const { body, status } = await global.testRequest.get('/users');
    expect(status).toBe(200);
    expect(body).toEqual([
        {
          email: 'usuariocomum@teste.com.br',
          accessLevel: 'funcionario'
        },
        {
          email: 'usuarioadm@teste.com.br',
          accessLevel: 'administrador'
        }
    ]);
  });
});
