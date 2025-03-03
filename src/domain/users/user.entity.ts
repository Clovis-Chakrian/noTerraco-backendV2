import { BaseUser } from "src/buildingblocks/authorization/entities/base-user.entity";

class User extends BaseUser {
  constructor(fullname: string, email: string, password: string) {
    super(fullname, email, password);
  }
}

export { User }