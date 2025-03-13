import { Command } from '@nestjs/cqrs';
import { UUID } from 'crypto';

class ToggleProductAvailabilityCommand extends Command<void> {
  constructor(public readonly productId: UUID) {
    super();
  }
}

export { ToggleProductAvailabilityCommand };
