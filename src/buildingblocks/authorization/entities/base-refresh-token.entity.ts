import { BaseUser } from "./base-user.entity";

abstract class BaseRefreshToken {
  token: string;
  createdAt: Date;
  usedAt: Date;
  expiresAt: Date;
  user: BaseUser;

  protected constructor() {
    this.setExpiresAt();
  }

  private setExpiresAt() {
    const now = new Date();
    this.expiresAt = new Date(now.getFullYear(), now.getMonth() + 6);
  }

  public isValid(): boolean {
    return this.expiresAt > new Date() && this.usedAt === null;
  }

  public useRefresh(): void {
    this.usedAt = new Date();
  }
}

export { BaseRefreshToken };