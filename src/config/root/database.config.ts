import { ValidateNested } from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { DevConfig } from './database/dev.config';
import { MigrationConfig } from './database/migration.config';
import { ConnectionConfig } from './database/connection.config';
import { OrmConfig } from './database/orm.config';

export class DatabaseConfig {
  @ValidateNested()
  @Type(() => DevConfig)
  dev!: DevConfig;

  @ValidateNested()
  @Type(() => MigrationConfig)
  migration!: MigrationConfig;

  @ValidateNested()
  @Type(() => ConnectionConfig)
  connection!: ConnectionConfig;

  @ValidateNested()
  @Type(() => OrmConfig)
  orm!: OrmConfig;

  driverOptions?: any;
}
