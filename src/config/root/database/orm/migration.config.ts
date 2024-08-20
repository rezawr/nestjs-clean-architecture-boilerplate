import { IsBoolean, IsString } from '@nestjs/class-validator';

export class MigrationConfig {
  @IsString()
  path!: string;

  @IsString()
  pathTs!: string;

  @IsBoolean()
  allOrNothing!: boolean;

  @IsBoolean()
  dropTables!: boolean;

  @IsBoolean()
  disableForeignKeys!: boolean;

  @IsBoolean()
  safe!: boolean;

  @IsBoolean()
  snapshot!: boolean;

  @IsBoolean()
  transactional!: boolean;
}
