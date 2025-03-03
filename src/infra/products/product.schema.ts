import { BaseEntitySchema } from 'src/buildingblocks/data/schemas/base-entity.schema';
import { Product } from 'src/domain/products/product.entity';
import { EntitySchema } from 'typeorm';

export const ProductSchema = new EntitySchema<Product>({
  name: 'product',
  tableName: 'products',
  columns: {
    ...BaseEntitySchema,
    name: {
      type: 'varchar',
      nullable: false,
      length: 250
    },
    description: {
      type: 'varchar',
      nullable: false,
      length: 250
    },
    image: {
      type: 'varchar',
      nullable: true,
      length: 250
    },
    price: {
      type: 'integer',
    },
    available: {
      type: 'boolean',
      default: true
    },
  },
  relations: {
    category: {
      target: 'category',
      type: 'one-to-many',
      joinColumn: true
    },
    customFields: {
      target: 'custom_field_product',
      type: 'one-to-many',
      joinColumn: true
    }
  }
});