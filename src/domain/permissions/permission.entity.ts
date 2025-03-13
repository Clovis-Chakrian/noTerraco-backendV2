import { BasePermission } from "src/buildingblocks/authorization/entities/base-permission.entity";

class Permission extends BasePermission {
  constructor(name: string, description: string) {
    super(name, description);
  }
}

export { Permission };