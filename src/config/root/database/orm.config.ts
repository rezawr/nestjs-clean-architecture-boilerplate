import { IsString } from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { MigrationConfig } from './orm/migration.config';

export class OrmConfig {
  @IsString({ each: true })
  entities!: string[];

  @IsString({ each: true })
  entitiesTs!: string[];

  @Type(() => MigrationConfig)
  migrations!: MigrationConfig;
}
