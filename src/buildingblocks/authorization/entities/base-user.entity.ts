import { randomUUID } from "crypto";
import { BaseRole } from "./base-role.entity";
import { BaseEntity } from "src/buildingblocks/core/base-entity";
import { BaseRefreshToken } from "./base-refresh-token.entity";

abstract class BaseUser extends BaseEntity {
  fullname: string;
  email: string;
  password: string;
  active: boolean;
  birthDate: Date;
  photo: string;
  roles: BaseRole[] = [];
  refreshTokens: BaseRefreshToken[] = [];

  activate(): void {
    this.active = true;
  }

  inativate(): void {
    this.active = false;
  }

  addRole(role: BaseRole): void {
    this.roles = [...this.roles, role]
  }

  constructor(fullname: string, email: string, password: string) {
    super(randomUUID());
    this.fullname = fullname;
    this.email = email;
    this.password = password;
  }
}

export { BaseUser }