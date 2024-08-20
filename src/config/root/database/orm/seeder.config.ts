import { IsString } from '@nestjs/class-validator';

export class SeederConfig {
  @IsString()
  path!: string;
}
