import { EntitySchemaColumnOptions } from "typeorm";

const BaseRefreshTokenSchema = {
  token: {
    type: "varchar",
    length: 36,
    primary: true
  } as EntitySchemaColumnOptions,
  createdAt: {
    type: "timestamp",
  } as EntitySchemaColumnOptions,
  usedAt: {
    type: "timestamp",
    nullable: true
  } as EntitySchemaColumnOptions,
  expiresAt: {
    type: "timestamp",
  } as EntitySchemaColumnOptions,
};

export { BaseRefreshTokenSchema }