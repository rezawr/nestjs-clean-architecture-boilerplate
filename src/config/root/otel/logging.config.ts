import { IsBoolean } from '@nestjs/class-validator';

export class LoggingConfig {
  @IsBoolean()
  enableAutoApiLogging!: boolean;

  @IsBoolean()
  level!: string;

  @IsBoolean()
  prettify!: boolean;

  @IsBoolean()
  quietReqLogger!: boolean;
}
