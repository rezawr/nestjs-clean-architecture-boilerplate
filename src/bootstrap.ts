import {
  INestApplication,
  RequestMethod,
  VersioningType,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

// function loadSwagger(
//   app: INestApplication,
//   configService: ConfigSer
// ): Promise<INestApplication> {
//   retur
// }

async function bootstrap(): Promise<[INestApplication]> {
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

  return [app];
}

export { bootstrap };
