import { SetupServer } from '@src/server';
import supertest from 'supertest';

beforeEach(() => {
  const server = new SetupServer();
  server.init();
  global.testRequest = supertest(server.getApp());
});
