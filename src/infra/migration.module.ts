import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import loader from 'src/config/loader';
import { LoggingConfig } from 'src/config/root/otel/logging.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loader],
      ignoreEnvFile: false,
      validationOptions: {
        allowUnknown: false,
        abortEarly: true,
      },
    }),

    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const cfg = config.get<LoggingConfig>('otel.logging');
        if (cfg == null) throw new Error('otel.logging is not defined');
        return {
          pinoHttp: {
            autoLogging: cfg.enableAutoApiLogging,
            level: cfg.level,
            transport: cfg.prettify
              ? {
                  target: 'pino-pretty',
                  options: {
                    colorize: true,
                    levelFirst: false,
                    translateTime: "yyyy-mm-dd'T'HH:MM:ss.l'Z'",
                    messageFormat:
                      '{req.headers.x-correlation-id} [{context}] {msg}',
                    hideObject: true,
                  },
                }
              : undefined,
            quietReqLogger: cfg.quietReqLogger,
          },
        };
      },
    }),
  ],
})
class MigrationModule {}

export { MigrationModule };
