import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateCategoryCommand } from 'src/application/categories/commands/create/create-category.command';
import { NewCategoryDto } from 'src/application/categories/commands/create/new-category-dto';
import { FindAllCategoriesQuery } from 'src/application/categories/queries/find-all/find-all-categories.query';
import { AllowAnonymous } from 'src/buildingblocks/authorization/decorators/is-public-route.decorator';
import { Category } from 'src/domain/categories/category.entity';

@ApiBearerAuth()
@Controller('/categories')
export class CategoriesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  @Post()
  async post(@Body() dto: NewCategoryDto): Promise<string> {
    return await this.commandBus.execute(new CreateCategoryCommand(dto));
  }

  @AllowAnonymous()
  @Get()
  async Get(): Promise<Category[]> {
    return await this.queryBus.execute(new FindAllCategoriesQuery());
  }
}
