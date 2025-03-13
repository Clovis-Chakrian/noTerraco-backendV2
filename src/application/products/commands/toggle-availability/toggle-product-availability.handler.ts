import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductRepository } from 'src/infra/products/product.respository';
import { CategoryRepository } from 'src/infra/categories/category.repository';
import { BadRequestException } from '@nestjs/common';
import { ToggleProductAvailabilityCommand } from './toggle-product-availability.command';

@CommandHandler(ToggleProductAvailabilityCommand)
class ToggleProductAvailabilityCommandHandler
  implements ICommandHandler<ToggleProductAvailabilityCommand>
{
  constructor(private readonly productRepository: ProductRepository, private readonly categoryRepository: CategoryRepository) {}

  async execute(command: ToggleProductAvailabilityCommand): Promise<void> {
    const product = await this.productRepository.findById(command.productId);

    if (product === null) throw new BadRequestException();

    product.toggleAvailability();

    await this.productRepository.update(product);
  }
}

export { ToggleProductAvailabilityCommandHandler };
