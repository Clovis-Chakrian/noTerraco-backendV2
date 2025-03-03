import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { TokenDto } from './token-dto';
import { PasswordEncoderService } from 'src/buildingblocks/authorization/password-encoder.service';
import { User } from 'src/domain/users/user.entity';
import { TokenService } from 'src/buildingblocks/authorization/token.service';
import { UserRepository } from 'src/infra/users/user.repository';
import { Role } from 'src/domain/roles/role.entity';
import { RoleRepository } from 'src/infra/roles/role.repository';
import { UserTypeEnum } from './user-type';

@CommandHandler(CreateUserCommand)
class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordEncoder: PasswordEncoderService,
    private readonly tokenService: TokenService,
    private readonly roleRepository: RoleRepository,
  ) { }

  async execute(command: CreateUserCommand): Promise<TokenDto> {
    const encodedPass = await this.passwordEncoder.encript(command.newUserDto.password);
    let user = new User(command.newUserDto.fullname, command.newUserDto.email, encodedPass);
    const role = await this.getRolesForUserType(command.userType);
    console.log(role);
    user.addRole(role);
    
    user = await this.userRepository.create(user)
    const accessToken = await this.tokenService.generateToken(user);

    return new TokenDto(accessToken, 'asd');
  }

  private async getRolesForUserType(userType: UserTypeEnum): Promise<Role> {
    const roles = await this.roleRepository.search({ name: userType });
    return roles[0];
  }
}

export { CreateUserCommandHandler };
