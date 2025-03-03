import { BaseEntitySchema } from 'src/buildingblocks/data/schemas/base-entity.schema';
import { CustomField } from 'src/domain/custom-fields/custom-field.entity';
import { EntitySchema } from 'typeorm';

export const CustomFieldSchema = new EntitySchema<CustomField>({
  name: 'custom_field',
  tableName: 'custom_fields',
  columns: {
    ...BaseEntitySchema,
    name: {
      type: 'varchar',
      nullable: false,
      unique: true,
      length: 250
    },
    label: {
      type: 'varchar',
      nullable: false,
      length: 250
    }
  },
  relations: {
    category: {
      target: 'category',
      type: 'many-to-one',
      nullable: false,
      joinColumn: {
        name: 'category_id'
      }
    },
    customFieldProducts: {
      target: 'custom_field_product',
      type: 'one-to-many',
      joinColumn: {
        name: 'custom_field_id',
      }
    }
  }
});