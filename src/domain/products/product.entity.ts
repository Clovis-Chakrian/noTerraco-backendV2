import { randomUUID } from 'crypto';
import { Category } from '../categories/category.entity';
import { CustomFieldProduct } from '../custom-fields-products/custom-field-product.entity';
import { BaseEntity } from 'src/buildingblocks/core/base-entity';

class Product extends BaseEntity {
  name: string;
  description: string;
  image: string;
  price: number;
  available: boolean;
  category: Category;
  customFields: CustomFieldProduct[];

  constructor(
    name: string,
    description: string,
    image: string,
    price: number,
    category: Category,
  ) {
    super(randomUUID());
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
    this.available = true;
    this.category = category;
  }
}

export { Product };
