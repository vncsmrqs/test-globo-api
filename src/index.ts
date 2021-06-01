import { SetupServer } from './server';
import config from 'config';
import { hashPassword } from '@src/models/user';

(async (): Promise<void> => {
  const server = new SetupServer(config.get('App.port'));
  await server.init();
  server.start();
})();
