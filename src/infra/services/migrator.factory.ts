import { Constructor } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/core/typings';
import { INestApplicationContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';
import { IMigrator } from './migrator.interface';
import { DatabaseMigrator } from './database.migrator';

@Injectable()
class MigratorFactory {
  constructor(
    private readonly cfg: ConfigService,
    private readonly logger: PinoLogger,
  ) {}

  createDatabase(
    moduleRef: INestApplicationContext,
    seeders: Record<string, Constructor<Seeder> | null | undefined>,
  ): IMigrator {
    return new DatabaseMigrator(this.cfg, moduleRef, seeders, this.logger);
  }
}

export { MigratorFactory };
