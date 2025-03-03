import { Provider } from "@nestjs/common";
import { User } from "src/domain/users/user.entity";
import { DataSource } from "typeorm";
import { UserSchema } from "./user.schema";
import { UserRepository } from "./user.repository";

export const userProviders = {
  providers: [
    {
      provide: 'USER_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository<User>(UserSchema),
      inject: ['DATA_SOURCE'],
    } as Provider,
  ],
  repositories: [
    UserRepository as Provider,
  ]
}