import { EntitySchemaColumnOptions } from "typeorm";

const BaseEntitySchema = {
  id: {
    type: "uuid",
    primary: true,
  } as EntitySchemaColumnOptions,
  createdAt: {
    type: "timestamp",
    nullable: false
  } as EntitySchemaColumnOptions,
  createdBy: {
    type: "varchar",
    length: 120,
    nullable: false
  } as EntitySchemaColumnOptions,
  updatedAt: {
    type: "timestamp",
    nullable: false
  } as EntitySchemaColumnOptions,
  updatedBy: {
    type: "varchar",
    length: 120,
    nullable: false
  } as EntitySchemaColumnOptions,
  deletedAt: {
    type: "timestamp",
    nullable: true
  } as EntitySchemaColumnOptions,
  deletedBy: {
    type: "varchar",
    length: 120,
    nullable: true
  } as EntitySchemaColumnOptions,
  deleted: {
    type: "boolean",
    default: false
  } as EntitySchemaColumnOptions,
};

export { BaseEntitySchema }