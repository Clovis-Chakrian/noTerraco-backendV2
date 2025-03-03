import { Command } from '@nestjs/cqrs';
import { NewCategoryDto } from './new-category-dto';

class CreateCategoryCommand extends Command<string> {
  constructor(public readonly newCategoryDto: NewCategoryDto) {
    super();
  }
}

export { CreateCategoryCommand };
