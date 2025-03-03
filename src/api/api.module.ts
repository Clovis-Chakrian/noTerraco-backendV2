import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { CategoriesController } from './controllers/categories.controller';
import { UsersController } from './controllers/users.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ApplicationModule, ConfigModule.forRoot()],
  controllers: [
    CategoriesController,
    UsersController,
  ],
})
export class ApiModule { }
