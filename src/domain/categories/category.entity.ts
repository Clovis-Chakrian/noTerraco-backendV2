import { randomUUID } from 'crypto';
import { CustomField } from '../custom-fields/custom-field.entity';
import { BaseEntity } from 'src/buildingblocks/core/base-entity';

class Category extends BaseEntity {
  name: string;
  primaryCategory: Category;
  customFields: CustomField[];

  constructor(name: string, primaryCategory?: Category) {
    super(randomUUID());

    this.name = name;
    if (primaryCategory != undefined && primaryCategory != null) {
      this.primaryCategory = primaryCategory;
    }
  }
}

export { Category };
