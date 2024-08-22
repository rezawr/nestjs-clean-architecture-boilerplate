import { Module } from '@nestjs/common';
import { UserMapper } from './adapters/database/user.mapper';
import { UserApiV1Mapper } from './adapters/api/v1/user.mapper';
import { UserRepository } from './adapters/database/user.repository';
import { UserService } from './domain/user.service';
import { UserV1Controller } from './adapters/api/v1/user.controller';

@Module({
  imports: [],
  providers: [UserMapper, UserApiV1Mapper, UserRepository, UserService],
  exports: [UserMapper, UserApiV1Mapper, UserRepository, UserService],
  controllers: [UserV1Controller],
})
export class UsersModule {}
