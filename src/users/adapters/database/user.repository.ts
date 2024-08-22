import { EntityManager } from '@mikro-orm/core';
import { InjectEntityManager } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { contexts } from 'src/constants';
import { User } from 'src/users/domain/models/user.model';
import { IUserRepository } from 'src/users/domain/user.repository';
import { UserEntity } from './entities/main/user.entity';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly em: EntityManager;

  constructor(
    @InjectEntityManager(contexts.MAIN)
    private readonly db: EntityManager,
    @Inject(UserMapper)
    private readonly mapper: UserMapper,
  ) {
    this.em = this.db.fork();
  }

  async list(): Promise<User[]> {
    const data = await this.em.find(UserEntity, {}, {});

    return data.map((item) => this.mapper.toModel(item));
  }
}
