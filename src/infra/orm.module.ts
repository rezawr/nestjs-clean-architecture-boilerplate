import { MySqlDriver } from '@mikro-orm/mysql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig } from 'src/config/root/database.config';

@Module({})
export class OrmModule {
  static register(contextName: string): DynamicModule {
    return {
      module: OrmModule,
      imports: [
        MikroOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (cfg: ConfigService) => {
            const databaseConfig =
              cfg.get<Record<string, DatabaseConfig>>('databases');
            if (databaseConfig == null)
              throw new Error('Database config not found');

            const dbConfig = databaseConfig[contextName];
            if (dbConfig == null) {
              throw new Error(
                `Database config for context ${contextName} is not found`,
              );
            }

            const {
              orm,
              connection: { database, ...conn },
              driverOptions,
            } = dbConfig;

            return {
              driver: MySqlDriver,
              entities: orm.entitiesTs,
              registerRequestContext: false,
              dbName: database,
              ...JSON.parse(JSON.stringify({ ...orm, ...conn })),
              driverOptions,
            };
          },
          contextName,
        }),
      ],
    };
  }
}
