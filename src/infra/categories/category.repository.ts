import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/buildingblocks/data/repositories/base-repository';
import { ICategoryRepository } from 'src/domain/categories/category-repository.interface';
import { Category } from 'src/domain/categories/category.entity';
import { Repository } from 'typeorm';

@Injectable()
class CategoryRepository extends BaseRepository<Category> implements ICategoryRepository {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private readonly categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository);
  }
}

export { CategoryRepository };
