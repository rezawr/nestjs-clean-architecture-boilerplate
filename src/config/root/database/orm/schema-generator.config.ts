import { IsBoolean } from '@nestjs/class-validator';

export class SchemaGeneratorConfig {
  @IsBoolean()
  disableForeignKeys!: boolean;
}
