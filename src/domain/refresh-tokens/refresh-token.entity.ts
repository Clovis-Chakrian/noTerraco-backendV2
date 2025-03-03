import { BaseRefreshToken } from "src/buildingblocks/authorization/entities/base-refresh-token.entity";
import { User } from "../users/user.entity";

class RefreshToken extends BaseRefreshToken { 
  constructor(user: User) {
    super();
    this.user = user;
  }
}

export { RefreshToken };