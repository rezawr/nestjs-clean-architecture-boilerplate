import {
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  ValidateNested,
} from '@nestjs/class-validator';
import { OtlpConfig } from './otlp/otlp.config';
import { Type } from 'class-transformer';

export class ExporterConfig {
  @IsIn(['console', 'otlp', 'none'])
  use!: 'console' | 'otlp' | 'none';

  @IsNumber()
  @IsPositive()
  interval!: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => OtlpConfig)
  otlp?: OtlpConfig;
}
