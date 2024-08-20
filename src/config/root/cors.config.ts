import { Type } from '@nestjs/class-transformer';
import { ArrayMinSize, ArrayNotEmpty, IsArray } from '@nestjs/class-validator';

export class CorsConfig {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @Type(() => String)
  origins!: string[];
}
