import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Category } from 'src/domain/categories/category.entity';
import { FindAllCategoriesQuery } from './find-all-categories.query';
import { CategoryRepository } from 'src/infra/categories/category.repository';
@QueryHandler(FindAllCategoriesQuery)
class FindAllCategoriesQueryHandler
  implements IQueryHandler<FindAllCategoriesQuery> {
  constructor(private readonly categoryRepository: CategoryRepository) { }

  async execute(query: FindAllCategoriesQuery): Promise<Category[]> {
    return await this.categoryRepository.search({});
  }
}

export { FindAllCategoriesQueryHandler };
