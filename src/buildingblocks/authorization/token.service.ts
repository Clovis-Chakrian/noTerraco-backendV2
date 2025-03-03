import { JwtService } from "@nestjs/jwt";
import { BaseUser } from "./entities/base-user.entity";
import { Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { ITokenPayload } from "../types/token-payload.interface";

@Injectable()
class TokenService {
  constructor(
    private readonly jwtService: JwtService
  ) { }

  async generateToken<TUser extends BaseUser>(user: TUser): Promise<string> {
    const payload = {
      sub: user.id,
      name: user.fullname,
      username: user.email,
      roles: user.roles ? user.roles.map(role => `ROLE_${role.name}`) : [],
    }

    return await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET, issuer: process.env.JWT_ISSUER });
  }

  async verifyToken(token: string): Promise<ITokenPayload> {
    return await this.jwtService.verifyAsync<ITokenPayload>(token, { secret: process.env.JWT_SECRET })
  }

  getSub(token: string): UUID {
    const payload = this.jwtService.decode<ITokenPayload>(token);

    return payload.sub;
  }

  getUsername(token: string): string {
    const payload = this.jwtService.decode<ITokenPayload>(token);

    return payload.username;
  }

  getRoles(token: string): string[] {
    const payload = this.jwtService.decode<ITokenPayload>(token);

    return payload.roles;
  }
}

export { TokenService };