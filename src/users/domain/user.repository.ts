import { User } from './models/user.model';

interface IUserRepository {
  list(): Promise<User[]>;
}

export type { IUserRepository };
