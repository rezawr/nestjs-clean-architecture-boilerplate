import { ConfigService } from '@nestjs/config';
import { IMigrator } from './migrator.interface';
import { INestApplicationContext } from '@nestjs/common';
import { Constructor, MikroORM } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/core/typings';
import { PinoLogger } from 'nestjs-pino';
import { DatabaseConfig } from 'src/config/root/database.config';
import { getMikroORMToken } from '@mikro-orm/nestjs';
import { delay } from '../util';

class DatabaseMigrator implements IMigrator {
  constructor(
    private readonly cfg: ConfigService,
    private readonly moduleRef: INestApplicationContext,
    private readonly seeder: Record<
      string,
      Constructor<Seeder> | null | undefined
    >,
    private readonly logger: PinoLogger,
  ) {}

  async migrate(): Promise<void> {
    const db = this.cfg.get<Record<string, DatabaseConfig>>('databases') ?? [];
    const config = this.cfg.get<string>('mode')! as 'app' | 'migration';

    const migrations = Object.entries(db).map(async ([name, dbConfig]) => {
      const orm = this.moduleRef.get<MikroORM>(getMikroORMToken(name), {
        strict: false,
      });

      if (
        (config === 'migration' && dbConfig.migration.migrate) ||
        (config === 'app' && dbConfig.dev.autoMigrate)
      ) {
        this.logger.info("start migrating database '%s'", name);
        try {
          this.logger.info("start creating schema '%s'", name);
          await orm.getSchemaGenerator().createSchema();
        } catch (e) {
          this.logger.info("start updating schema '%s'", name);
          await orm.getSchemaGenerator().updateSchema({
            dropDb: false,
            safe: true,
          });
        }
      }

      if (
        (config === 'migration' && dbConfig.migration.seed) ||
        (config === 'app' && dbConfig.dev.autoSeed)
      ) {
        this.logger.info("start seeding database '%s'", name);
        try {
          const seed = this.seeder[name];
          if (seed) await orm.seeder.seed(seed);
        } catch (e) {
          this.logger.error(e);
        }
      }
    });

    await Promise.all(migrations);
  }

  async wait(): Promise<void> {
    const db = this.cfg.get<Record<string, DatabaseConfig>>('databases') ?? {};
    const config = this.cfg.get<string>('mode')! as 'app' | 'migration';

    const waiter = Object.entries(db).map(async ([name, dbConfig]) => {
      const orm = this.moduleRef.get<MikroORM>(getMikroORMToken(name), {
        strict: false,
      });

      let count = 0;
      const timeout =
        config === 'migration'
          ? dbConfig.migration.timeout
          : dbConfig.dev.timeout;
      while (count < timeout) {
        const isConnected = await orm.isConnected();
        if (isConnected) {
          this.logger.info("connected to database '%s'", name);
          return;
        }

        await delay(1000);

        this.logger.info(
          "waiting for database '%s' to connect, attempt: '%s'",
          name,
          count,
        );
        count++;
      }
      throw new Error(`failed to connect to database '${name}'`);
    });
    await Promise.all(waiter);
  }
}

export { DatabaseMigrator };
