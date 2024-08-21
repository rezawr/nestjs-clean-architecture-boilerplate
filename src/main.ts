// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
import { bootstrap, migration, wait } from './bootstrap';
import 'reflect-metadata';

async function start() {
  // const app = await NestFactory.create(AppModule);
  await wait();
  await migration();
  const [app, host] = await bootstrap();
  console.log(host);
  await app.listen(host.port, host.host);
}

start().then();
