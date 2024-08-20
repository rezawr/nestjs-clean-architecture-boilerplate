import {
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from '@nestjs/class-validator';

export class OtlpConfig {
  @IsString()
  url!: string;

  @IsNumber()
  @IsPositive()
  timeout!: number;

  @IsIn(['none', 'gzip'])
  compression!: 'none' | 'gzip';
  @IsOptional()
  @IsString({
    each: true,
  })
  headers?: { [s: string]: string };
}
