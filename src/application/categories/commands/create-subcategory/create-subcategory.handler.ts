import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Category } from 'src/domain/categories/category.entity';
import { CategoryRepository } from 'src/infra/categories/category.repository';
import { CreateSubcategoryCommand } from './create-subcategory.command';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(CreateSubcategoryCommand)
class CreateSubcategoryCommandHandler
  implements ICommandHandler<CreateSubcategoryCommand>
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(command: CreateSubcategoryCommand): Promise<string> {
    const primaryCategory = await this.categoryRepository.findById(command.primaryCategoryId);

    if (primaryCategory === null) throw new BadRequestException();

    const category = await this.categoryRepository.create(
      new Category(command.newSubcategoryDto.name, primaryCategory),
    );

    return category.id;
  }
}

export { CreateSubcategoryCommandHandler };
