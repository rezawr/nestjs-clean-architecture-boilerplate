import { Inject, Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { User } from './models/user.model';
import { UserRepository } from '../adapters/database/user.repository';
import { IUserRepository } from './user.repository';

interface IUserService {
  list(): Promise<User[]>;
}

@Injectable()
class UserService implements IUserService {
  constructor(
    @Inject(PinoLogger)
    private readonly logger: PinoLogger,
    @Inject(UserRepository)
    private readonly repo: IUserRepository,
  ) {}

  async list(): Promise<User[]> {
    this.logger.setContext(`${UserService.name} - ${this.list.name}`);

    const users = await this.repo.list();
    return users;
  }
}

export { IUserService, UserService };
