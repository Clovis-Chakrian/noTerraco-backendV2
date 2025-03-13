import { Provider } from "@nestjs/common";
import { DataSource } from "typeorm";
import { RefreshToken } from "src/domain/refresh-tokens/refresh-token.entity";
import { RefreshTokenSchema } from "./refresh-token.schema";
import { RefreshTokenRepository } from "./refresh-token.repository";

export const refreshTokenProviders = {
  providers: [
    {
      provide: 'REFRESHTOKEN_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository<RefreshToken>(RefreshTokenSchema),
      inject: ['DATA_SOURCE'],
    } as Provider,
  ],
  repositories: [
    RefreshTokenRepository as Provider,
  ]
}