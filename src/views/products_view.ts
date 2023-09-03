import { Product } from "@prisma/client";
import formatPrice from "../utils/formatPrice";

export default {
  render(product: Product) {
    return {
      id: product.id,
      name: product.name,
      type: product.type,
      subtype: product.subtype,
      description: product.description,
      imageUrl: product.imageUrl,
      imageId: product.imageId,
      price: formatPrice.format(product.price),
      availability: product.availability,
      priceForTwo: product.priceForTwo ? formatPrice.format(product.priceForTwo) : product.priceForTwo
    };
  },

  renderMany(products: Product[]) {
    return products.map(product => this.render(product))
  }
};