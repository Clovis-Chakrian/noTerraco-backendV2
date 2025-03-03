import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { userProviders } from './users/user.providers';
import { roleProviders } from './roles/role.providers';
import { categoryProviders } from './categories/category.providers';
import { productProviders } from './products/product.providers';

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
    ...productProviders.repositories
  ],
  exports: [
    ...databaseProviders,
    ...userProviders.repositories,
    ...roleProviders.repositories,
    ...categoryProviders.repositories,
    ...productProviders.repositories
  ],
})
export class InfraModule {}
