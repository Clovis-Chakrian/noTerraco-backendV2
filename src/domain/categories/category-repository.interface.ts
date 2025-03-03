import { IBaseRepository } from 'src/buildingblocks/data/repositories/base-repository.interface';
import { Category } from './category.entity';

interface ICategoryRepository extends IBaseRepository<Category> {}

export { ICategoryRepository };