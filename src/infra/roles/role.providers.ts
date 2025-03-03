import { Provider } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Role } from "src/domain/roles/role.entity";
import { RoleSchema } from "./role.schema";
import { RoleRepository } from "./role.repository";

export const roleProviders = {
  providers: [
    {
      provide: 'ROLE_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository<Role>(RoleSchema),
      inject: ['DATA_SOURCE'],
    } as Provider,
  ],
  repositories: [
    RoleRepository as Provider,
  ]
}