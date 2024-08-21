import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { OpenTelemetryModule } from 'nestjs-otel';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MetricsConfig } from './config/root/otel/metrics.config';
import { MigrationModule } from './infra/migration.module';

@Module({
  imports: [
    MigrationModule,

    OpenTelemetryModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const cfg = config.get<MetricsConfig>('otel.metrics');
        if (cfg == null) throw new Error('otel.metrics is not defined');
        return {
          metrics: {
            hostMetrics: cfg.hostMetrics,
            apiMetrics: {
              enable: cfg.api.enable,
              defaultAttributes: cfg.api.defaultAttributes,
              ignoreRoutes: cfg.api.ignoreRoutes,
              ignoreUndefinedRoutes: cfg.api.ignoreUndefinedRoutes,
            },
          },
        };
      },
    }),

    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
