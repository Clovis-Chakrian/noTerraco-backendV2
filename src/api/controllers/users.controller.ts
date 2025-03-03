import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserCommand } from 'src/application/users/commands/create/create-user.command';
import { NewUserDto } from 'src/application/users/commands/create/new-user-dto';
import { TokenDto } from 'src/application/users/commands/create/token-dto';
import { UserTypeEnum } from 'src/application/users/commands/create/user-type';
import { LoginDto } from 'src/application/users/commands/login/login-dto';
import { LoginCommand } from 'src/application/users/commands/login/login.command';
import { AuthWithRole } from 'src/buildingblocks/authorization/decorators/authorize-with-role.decorator';
import { AllowAnonymous } from 'src/buildingblocks/authorization/decorators/is-public-route.decorator';

@ApiBearerAuth()
@Controller('/users')
export class UsersController {
  constructor(private readonly commandBus: CommandBus) {}

  @AllowAnonymous()
  @Post('/login')
  async postLogin(@Body() dto: LoginDto): Promise<TokenDto> {
    return await this.commandBus.execute(new LoginCommand(dto));
  }

  @AllowAnonymous()
  @Post()
  async postClient(@Body() dto: NewUserDto): Promise<TokenDto> {
    return await this.commandBus.execute(new CreateUserCommand(dto, UserTypeEnum.USER_CLIENT));
  }

  @AuthWithRole(['ROLE_OWNER'])
  @Post('/admins')
  async postAdmin(@Body() dto: NewUserDto): Promise<TokenDto> {
    return await this.commandBus.execute(new CreateUserCommand(dto, UserTypeEnum.USER_ADMIN));
  }

  @AuthWithRole(['ROLE_OWNER'])
  @Post('/owners')
  async postOwner(@Body() dto: NewUserDto): Promise<TokenDto> {
    return await this.commandBus.execute(new CreateUserCommand(dto, UserTypeEnum.USER_OWNER));
  }
}
