import { Controller, Get, Inject } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { UserRes } from './dto/user.res';
import { IUserService, UserService } from 'src/users/domain/user.service';
import { UserApiV1Mapper } from './user.mapper';

@Controller({ version: '1', path: 'users' })
export class UserV1Controller {
  constructor(
    @Inject(PinoLogger)
    private readonly logger: PinoLogger,
    @Inject(UserService)
    private readonly svc: IUserService,
    @Inject(UserApiV1Mapper)
    private readonly mapper: UserApiV1Mapper,
  ) {}

  @Get()
  async list(): Promise<UserRes[]> {
    const result = await this.svc.list();

    return result.map((item) => this.mapper.toRes(item));
  }
}
