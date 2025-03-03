import { BaseEntitySchema } from "src/buildingblocks/data/schemas/base-entity.schema";
import { EntitySchemaColumnOptions } from "typeorm";

const BasePermisionSchema = {
  ...BaseEntitySchema,
  name: {
    type: "varchar",
    length: 250,
    unique: true
  } as EntitySchemaColumnOptions,
  description: {
    type: "varchar",
    length: 250,
    unique: true
  } as EntitySchemaColumnOptions,
};

export { BasePermisionSchema }