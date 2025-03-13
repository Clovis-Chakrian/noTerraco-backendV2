import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductRepository } from 'src/infra/products/product.respository';
import { CategoryRepository } from 'src/infra/categories/category.repository';
import { BadRequestException } from '@nestjs/common';
import { UpdateProductCommand } from './update-product.command';

@CommandHandler(UpdateProductCommand)
class UpdateProductCommandHandler
  implements ICommandHandler<UpdateProductCommand>
{
  constructor(private readonly productRepository: ProductRepository, private readonly categoryRepository: CategoryRepository) {}

  async execute(command: UpdateProductCommand): Promise<string> {
    const product = await this.productRepository.findById(command.productId);
    if (product === null) throw new BadRequestException();

    const category = await this.categoryRepository.findById(command.updateProductDto.categoryId);
    if (category === null) throw new BadRequestException();
    
    product.update(command.updateProductDto.name, command.updateProductDto.description, command.updateProductDto.image, command.updateProductDto.price, category);

    await this.productRepository.update(product);

    return product.id;
  }
}

export { UpdateProductCommandHandler };
