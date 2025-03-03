import { BaseEntitySchema } from 'src/buildingblocks/data/schemas/base-entity.schema';
import { Category } from 'src/domain/categories/category.entity';
import { EntitySchema } from 'typeorm';

export const CategorySchema = new EntitySchema<Category>({
  name: 'category',
  tableName: 'categories',
  columns: {
    ...BaseEntitySchema,
    name: {
      type: 'varchar',
      nullable: false,
      length: 250
    }
  },
  relations: {
    primaryCategory: {
      target: 'category',
      type: 'many-to-one',
      nullable: true,
      joinColumn: {
        name: 'primary_category_id'
      },
    },
    customFields: {
      target: 'custom_field',
      type: 'one-to-many',
      joinColumn: {
        name: 'category_id'
      }
    }
  }
});