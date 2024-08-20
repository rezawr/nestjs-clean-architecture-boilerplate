import { IsIn, IsInt, IsString, Max, Min } from '@nestjs/class-validator';

export class ConnectionConfig {
  @IsInt()
  @Min(0)
  @Max(65535)
  port!: number;

  @IsString()
  user!: string;

  @IsString()
  password!: string;

  @IsString()
  database!: string;

  @IsString()
  host!: string;

  @IsIn(['mysql', 'postgresql'])
  connection!: 'mysql' | 'postgresql';
}
