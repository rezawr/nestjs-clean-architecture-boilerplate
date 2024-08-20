import { IsBoolean, IsNumber, IsPositive } from '@nestjs/class-validator';

export class DevConfig {
  @IsBoolean()
  autoMigrate!: boolean;

  @IsBoolean()
  autoSeed!: boolean;

  @IsNumber()
  @IsPositive()
  timeout!: number;

  @IsBoolean()
  debug: boolean;
}
