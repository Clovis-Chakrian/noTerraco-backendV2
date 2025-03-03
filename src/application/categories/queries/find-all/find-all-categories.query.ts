import { Query } from '@nestjs/cqrs';
import { Category } from 'src/domain/categories/category.entity';

class FindAllCategoriesQuery extends Query<Category[]> {
  constructor() {
    super();
  }
}

export { FindAllCategoriesQuery };
