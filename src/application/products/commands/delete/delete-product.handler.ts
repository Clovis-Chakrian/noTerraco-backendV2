import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductRepository } from 'src/infra/products/product.respository';
import { BadRequestException } from '@nestjs/common';
import { DeleteProductCommand } from './delete-product.command';

@CommandHandler(DeleteProductCommand)
class DeleteProductCommandHandler
  implements ICommandHandler<DeleteProductCommand> {
  constructor(private readonly productRepository: ProductRepository) { }

  async execute(command: DeleteProductCommand): Promise<void> {
    const product = await this.productRepository.findById(command.productId);

    if (product === null) throw new BadRequestException();

    product.delete("oi");

    await this.productRepository.update(product);
  }
}

export { DeleteProductCommandHandler };
