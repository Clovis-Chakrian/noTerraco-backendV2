import { Command } from '@nestjs/cqrs';
import { NewProductDto } from './new-product-dto';

class CreateProductCommand extends Command<string> {
  constructor(public readonly newProductDto: NewProductDto) {
    super();
  }
}

export { CreateProductCommand };
