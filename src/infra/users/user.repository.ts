import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/buildingblocks/data/repositories/base-repository';
import { User } from 'src/domain/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
class UserRepository extends BaseRepository<User> {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }
}

export { UserRepository };
