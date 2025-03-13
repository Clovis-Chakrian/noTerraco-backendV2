import { Command } from '@nestjs/cqrs';
import { UpdateProductDto } from './update-product-dto';
import { UUID } from 'crypto';

class UpdateProductCommand extends Command<string> {
  constructor(public readonly productId: UUID, public readonly updateProductDto: UpdateProductDto) {
    super();
  }
}

export { UpdateProductCommand };
