// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
import { bootstrap, wait } from './bootstrap';
import 'reflect-metadata';

async function start() {
  // const app = await NestFactory.create(AppModule);
  await wait();
  const [app, host] = await bootstrap();
  console.log(host);
  await app.listen(host.port, host.host);
}

start().then();
