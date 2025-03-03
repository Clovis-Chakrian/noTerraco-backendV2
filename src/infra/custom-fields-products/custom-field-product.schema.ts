import { BaseEntitySchema } from 'src/buildingblocks/data/schemas/base-entity.schema';
import { CustomFieldProduct } from 'src/domain/custom-fields-products/custom-field-product.entity';
import { EntitySchema } from 'typeorm';

export const CustomFieldProductSchema = new EntitySchema<CustomFieldProduct>({
  name: 'custom_field_product',
  tableName: 'custom_fields_products',
  columns: {
    ...BaseEntitySchema,
    value: {
      type: 'varchar',
      length: 450
    },
  },
  relations: {
    customField: {
      target: 'custom_field',
      type: 'many-to-one',
      nullable: false,
      joinColumn: {
        name: 'custom_field_id'
      }
    },
    product: {
      target: 'product',
      type: 'many-to-one',
    }
  }
});