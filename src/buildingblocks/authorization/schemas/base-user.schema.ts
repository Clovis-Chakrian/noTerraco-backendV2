import { BaseEntitySchema } from "src/buildingblocks/data/schemas/base-entity.schema";
import { EntitySchemaColumnOptions } from "typeorm";

const BaseUserSchema = {
  ...BaseEntitySchema,
  fullname: {
    type: "varchar",
    length: 250,
  } as EntitySchemaColumnOptions,
  email: {
    type: "varchar",
    length: 350,
    unique: true,
    nullable: false
  } as EntitySchemaColumnOptions,
  password: {
    type: "varchar",
    length: 200,
    nullable: false
  } as EntitySchemaColumnOptions,
  active: {
    type: "boolean",
    nullable: false,
    default: true
  } as EntitySchemaColumnOptions,
  birthDate: {
    name: 'birth_date',
    type: "timestamp",
    nullable: true
  } as EntitySchemaColumnOptions,
  photo: {
    type: "varchar",
    nullable: true
  } as EntitySchemaColumnOptions,
};

export { BaseUserSchema }