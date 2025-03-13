import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PasswordEncoderService } from 'src/buildingblocks/authorization/password-encoder.service';
import { TokenService } from 'src/buildingblocks/authorization/token.service';
import { UserRepository } from 'src/infra/users/user.repository';
import { LoginCommand } from './login.command';
import { TokenDto } from '../create/token-dto';
import { UnauthorizedException } from '@nestjs/common';

@CommandHandler(LoginCommand)
class LoginCommandHandler
  implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordEncoder: PasswordEncoderService,
    private readonly tokenService: TokenService,
  ) { }

  async execute(command: LoginCommand): Promise<TokenDto> {
    const user = (await this.userRepository.search({ email: command.loginDto.email }))[0];
    const correctPass = await this.passwordEncoder.compare(command.loginDto.password, user.password)

    if (!correctPass) throw new UnauthorizedException();

    const accessToken = await this.tokenService.generateToken(user);
    const refreshToken = await this.tokenService.generateRefreshToken(user);

    return new TokenDto(accessToken, refreshToken);
  }
}

export { LoginCommandHandler };
