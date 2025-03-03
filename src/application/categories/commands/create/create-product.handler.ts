import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCategoryCommand } from './create-category.command';
import { Category } from 'src/domain/categories/category.entity';
import { CategoryRepository } from 'src/infra/categories/category.repository';

@CommandHandler(CreateCategoryCommand)
class CreateCategoryCommandHandler
  implements ICommandHandler<CreateCategoryCommand>
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(command: CreateCategoryCommand): Promise<string> {
    const category = await this.categoryRepository.create(
      new Category(command.newCategoryDto.name),
    );

    return category.id;
  }
}

export { CreateCategoryCommandHandler };
