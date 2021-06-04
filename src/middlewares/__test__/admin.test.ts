import AuthService from '@src/services/auth';
import { adminMiddleware } from "@src/middlewares/admin";

describe('AdminMiddleware', () => {
  it('should verify a if the user has access and call the next middleware', () => {
    const defaultUser = {
      email: 'usuariocomum@teste.com.br',
      accessLevel: 'administrador',
      iat: 0,
      exp: 0,
    };
    const reqFake = {
      decoded: defaultUser,
    };
    const resFake = {};
    const nextFake = jest.fn();
    adminMiddleware(reqFake, resFake, nextFake);
    expect(nextFake).toHaveBeenCalled();
  });

  it('should return ANAUTHORIZED middleware if the user havent access', () => {
    const defaultUser = {
      email: 'usuariocomum@teste.com.br',
      accessLevel: 'funcionario',
      iat: 0,
      exp: 0,
    };
    const reqFake = {
      decoded: defaultUser,
    };
    const sendMock = jest.fn();
    const resFake = {
      status: jest.fn(() => ({
        send: sendMock,
      })),
    };
    const nextFake = jest.fn();
    adminMiddleware(reqFake, resFake as object, nextFake);
    expect(resFake.status).toHaveBeenCalledWith(403);
    expect(sendMock).toHaveBeenCalledWith({
      code: 403,
      name: 'PermissionDeniedError',
      message: 'Permission denied',
    });
  });
});
