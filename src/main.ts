import { bootstrap, migration, wait } from './bootstrap';
import 'reflect-metadata';

async function start() {
  wait().then(() =>
    migration().then(async () => {
      const [app, host] = await bootstrap();
      await app.listen(host.port, host.host)
    }),
  );
}

start().then();
