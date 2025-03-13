import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from './create-product.command';
import { ProductRepository } from 'src/infra/products/product.respository';
import { Product } from 'src/domain/products/product.entity';
import { CategoryRepository } from 'src/infra/categories/category.repository';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(CreateProductCommand)
class CreateProductCommandHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(private readonly productRepository: ProductRepository, private readonly categoryRepository: CategoryRepository) {}

  async execute(command: CreateProductCommand): Promise<string> {
    const category = await this.categoryRepository.findById(command.newProductDto.categoryId);

    if (category === null) throw new BadRequestException();

    const product = await this.productRepository.create(
      new Product(command.newProductDto.name, command.newProductDto.description, command.newProductDto.image, command.newProductDto.price, category),
    );

    return product.id;
  }
}

export { CreateProductCommandHandler };
