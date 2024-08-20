import { IsIn, IsString, ValidateNested } from '@nestjs/class-validator';
import { HostConfig } from './root/host.config';
import { Type } from 'class-transformer';
import { DatabaseConfig } from './root/database.config';
import { CorsConfig } from './root/cors.config';

export class RootConfig {
  @IsString()
  @IsIn(['app', 'migration'])
  model!: 'app' | 'migration';

  @ValidateNested()
  @Type(() => HostConfig)
  host!: HostConfig;

  @ValidateNested({
    each: true,
  })
  @Type(() => DatabaseConfig)
  databases!: { [s: string]: DatabaseConfig };

  @ValidateNested({
    each: true,
  })
  @Type(() => CorsConfig)
  cors!: CorsConfig;
}
