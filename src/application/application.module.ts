import { Module } from '@nestjs/common';
import { InfraModule } from 'src/infra/infra.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateCategoryCommandHandler } from './categories/commands/create/create-product.handler';
import { FindAllCategoriesQueryHandler } from './categories/queries/find-all/find-all-categories.handler';
import { LibsModule } from 'src/buildingblocks/libs.module';
import { CreateUserCommandHandler } from './users/commands/create/create-user.handler';
import { LoginCommandHandler } from './users/commands/login/login.handler';

@Module({
  imports: [InfraModule, CqrsModule.forRoot(), LibsModule],
  providers: [CreateCategoryCommandHandler, FindAllCategoriesQueryHandler, CreateUserCommandHandler, LoginCommandHandler],
  exports: [],
})
export class ApplicationModule {}
