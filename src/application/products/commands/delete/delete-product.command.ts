import { Command } from '@nestjs/cqrs';
import { UUID } from 'crypto';

class DeleteProductCommand extends Command<void> {
  constructor(public readonly productId: UUID) {
    super();
  }
}

export { DeleteProductCommand };
