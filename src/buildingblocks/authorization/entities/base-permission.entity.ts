import { BaseEntity } from "src/buildingblocks/core/base-entity";
import { BaseRole } from "./base-role.entity";
import { randomUUID } from "crypto";

abstract class BasePermission extends BaseEntity {
  name: string;
  description: string;
  roles: BaseRole[];

  constructor(name: string, description: string) {
    super(randomUUID());
    this.name = name;
    this.description = description;
  }
}

export { BasePermission }