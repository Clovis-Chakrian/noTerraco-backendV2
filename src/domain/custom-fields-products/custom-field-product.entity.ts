import { BaseEntity } from 'src/buildingblocks/core/base-entity';
import { CustomField } from '../custom-fields/custom-field.entity';
import { Product } from '../products/product.entity';

class CustomFieldProduct extends BaseEntity {
  value: string;
  customField: CustomField;
  product: Product;
}

export { CustomFieldProduct };
