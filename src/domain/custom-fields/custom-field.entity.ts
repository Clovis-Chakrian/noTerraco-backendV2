import { BaseEntity } from 'src/buildingblocks/core/base-entity';
import { Category } from '../categories/category.entity';
import { CustomFieldProduct } from '../custom-fields-products/custom-field-product.entity';

class CustomField extends BaseEntity {
  name: string;
  label: string;
  category: Category;
  customFieldProducts: CustomFieldProduct[];
}

export { CustomField };
