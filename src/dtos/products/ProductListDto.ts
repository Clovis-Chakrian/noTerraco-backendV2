import { Product } from "@prisma/client";
import formatPrice from "../../utils/formatPrice";

export class ProductListDto {
  private id: string;
  private name: string;
  private type: string;
  private subtype: string | null;
  private description: string | null;
  private imageUrl: string | null;
  private price: string;
  private priceForTwo: string;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.type = product.type;
    this.subtype = product.subtype;
    this.description = product.description;
    this.imageUrl = product.imageUrl;
    this.price = formatPrice.format(product.price);
    this.priceForTwo = formatPrice.format(product.priceForTwo);
  }
}