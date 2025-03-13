import { Command } from '@nestjs/cqrs';
import { NewSubcategoryDto } from './new-subcategory-dto';
import { UUID } from 'crypto';

class CreateSubcategoryCommand extends Command<string> {
  constructor(public readonly primaryCategoryId: UUID, public readonly newSubcategoryDto: NewSubcategoryDto) {
    super();
  }
}

export { CreateSubcategoryCommand };
