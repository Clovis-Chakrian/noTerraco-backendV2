import { Command } from '@nestjs/cqrs';
import { TokenDto } from './token-dto';
import { NewUserDto } from './new-user-dto';
import { UserTypeEnum } from './user-type';

class CreateUserCommand extends Command<TokenDto> {
  constructor(public readonly newUserDto: NewUserDto, public readonly userType: UserTypeEnum) {
    super();
  }
}

export { CreateUserCommand };
