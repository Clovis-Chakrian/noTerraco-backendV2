import { randomUUID } from "crypto";
import { BaseEntity } from "src/buildingblocks/core/base-entity";
import { BaseUser } from "./base-user.entity";

abstract class BaseRole extends BaseEntity {
  name: string;
  description: string;
  users: BaseUser[] = [];

  protected constructor(name: string, description: string) {
    super(randomUUID());
    this.name = name;
    this.description = description;
  }
}

export { BaseRole };