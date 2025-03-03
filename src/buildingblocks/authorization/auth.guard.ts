import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AUTHORIZE_WITH_ROLE_KEY } from "./decorators/authorize-with-role.decorator";
import { TokenService } from "./token.service";
import { ALLOW_ANONYMOUS_KEY } from "./decorators/is-public-route.decorator";

@Injectable()
class AuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService, private readonly reflector: Reflector) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(ALLOW_ANONYMOUS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    };

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.tokenService.verifyToken(token);

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    const roles = this.reflector.getAllAndOverride<string[]>(AUTHORIZE_WITH_ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (roles === null || roles === undefined || roles.length <= 0) return true;

    if (roles.filter(role => this.tokenService.getRoles(token).includes(role)).length <= 0) throw new ForbiddenException();

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

export { AuthGuard };