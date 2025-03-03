import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/buildingblocks/data/repositories/base-repository';
import { Product } from 'src/domain/products/product.entity';
import { Repository } from 'typeorm';

@Injectable()
class ProductRepository extends BaseRepository<Product> {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: Repository<Product>,
  ) {
    super(productRepository);
  }
}

export { ProductRepository };
