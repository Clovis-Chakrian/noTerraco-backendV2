import { Command } from '@nestjs/cqrs';
import { TokenDto } from '../create/token-dto';
import { LoginDto } from './login-dto';

class LoginCommand extends Command<TokenDto> {
  constructor(public readonly loginDto: LoginDto) {
    super();
  }
}

export { LoginCommand };
