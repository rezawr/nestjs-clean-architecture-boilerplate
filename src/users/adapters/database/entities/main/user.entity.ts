import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/common/base.entity';

@Entity({ tableName: 'users' })
export class UserEntity extends BaseEntity {
  @Property({ type: 'varchar', length: 150 })
  email!: string;

  @Property({ type: Date, nullable: true })
  email_verified_at: Date = new Date();

  @Property({ type: 'varchar', length: 150 })
  firstName!: string;

  @Property({ type: 'varchar', length: 150 })
  lastName!: string;

  @Property({ type: 'text' })
  password!: string;
}
