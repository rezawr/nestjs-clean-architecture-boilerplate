import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/main/user.entity';
import { User, UserRecord } from 'src/users/domain/models/user.model';

@Injectable()
export class UserMapper {
  toRecord(entity: UserEntity): UserRecord {
    return new UserRecord(entity.firstName, entity.lastName, entity.email);
  }

  toModel(entity: UserEntity): User {
    return new User(entity.id, this.toRecord(entity));
  }
}
