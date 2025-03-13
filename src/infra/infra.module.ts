import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { userProviders } from './users/user.providers';
import { roleProviders } from './roles/role.providers';
import { categoryProviders } from './categories/category.providers';
import { productProviders } from './products/product.providers';
import { refreshTokenProviders } from './refresh-tokens/refresh-token.providers';

@Module({
  providers: [
    ...databaseProviders,
    ...userProviders.providers,
    ...userProviders.repositories,
    ...roleProviders.providers,
    ...roleProviders.repositories,
    ...categoryProviders.providers,
    ...categoryProviders.repositories,
    ...productProviders.providers,
    ...productProviders.repositories,
    ...refreshTokenProviders.providers,
    ...refreshTokenProviders.repositories
  ],
  exports: [
    ...databaseProviders,
    ...userProviders.repositories,
    ...roleProviders.repositories,
    ...categoryProviders.repositories,
    ...productProviders.repositories,
    ...refreshTokenProviders.repositories
  ],
})
export class InfraModule {}
