import { BaseRole } from "src/buildingblocks/authorization/entities/base-role.entity";

class Role extends BaseRole {
  constructor(name: string, description: string) {
    super(name, description);
  }
}

export { Role };