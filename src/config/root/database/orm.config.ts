import { IsString, ValidateNested } from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { MigrationConfig } from './migration.config';

export class OrmConfig {
  @IsString({ each: true })
  entities!: string[];

  @IsString({ each: true })
  entitiesTs!: string[];

  @ValidateNested()
  @Type(() => MigrationConfig)
  migrations!: MigrationConfig;
}
