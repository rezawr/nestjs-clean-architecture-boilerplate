import {
  INestApplication,
  RequestMethod,
  VersioningType,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { CorsConfig } from './config/root/cors.config';
import { HostConfig } from './config/root/host.config';
import { MigrationModule } from './infra/migration.module';
import { MigratorFactory } from './infra/services/migrator.factory';

async function bootstrap(): Promise<[INestApplication, HostConfig]> {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  app.enableVersioning({ type: VersioningType.URI });
  app.setGlobalPrefix('api', {
    exclude: [
      {
        path: '/',
        method: RequestMethod.GET,
      },
    ],
  });

  const configService = app.get(ConfigService);
  const corsConfig = configService.get<CorsConfig>('cors');
  if (corsConfig == null) throw new Error('cors is not defined');

  const origins = corsConfig.origins;
  app.enableCors({
    origin: origins,
    allowedHeaders: [
      'Access-Control-Allow-Origin',
      'Origin',
      'X-Requested-With',
      'Accept',
      'Content-Type',
      'Authorization',
    ],
    exposedHeaders: 'Authorization',
    credentials: true,
    methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'PATCH', 'DELETE'],
  });

  const hostConfig = configService.get<HostConfig>('host')!;

  return [app, hostConfig];
}

async function wait() {
  const waiter = await NestFactory.createApplicationContext(MigrationModule, {
    bufferLogs: true,
  });
  await waiter.init();
  waiter.useLogger(waiter.get(Logger));

  // const fact = await waiter.resolve(Migration)
  waiter.flushLogs();
  await waiter.close();
}

async function migration() {
  const migration = await NestFactory.createApplicationContext(
    MigrationModule,
    {
      bufferLogs: true,
    },
  );
  await migration.init();

  migration.useLogger(migration.get(Logger));
  const factory = await migration.resolve(MigratorFactory);
  const db = factory.createDatabase(migration, {});
  await Promise.all([db].map((x) => x.migrate()));
  migration.flushLogs();
  await migration.close();
}

export { bootstrap, wait, migration };
