/* eslint-disable @typescript-eslint/no-empty-object-type */
import { IBaseRepository } from 'src/buildingblocks/data/repositories/base-repository.interface';
import { Product } from './product.entity';

interface IProductRepository extends IBaseRepository<Product> {}

export { IProductRepository };
