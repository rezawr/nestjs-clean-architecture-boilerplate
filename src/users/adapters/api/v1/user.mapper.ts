import { User } from 'src/users/domain/models/user.model';
import { UserRes } from './dto/user.res';

export class UserApiV1Mapper {
  toRes(data: User): UserRes {
    return {
      id: data.id,
      email: data.record.email,
      first_name: data.record.firstName,
      last_name: data.record.lastName,
      full_name: data.record.fullName,
    };
  }
}
