import { Product } from "@prisma/client";

export default {
  render(product: Product) {
    return {
      id: product.id,
      name: product.name,
      type: product.type,
      subtype: product.subtype,
      description: product.description,
      memory: product.memory,
      imageUrl: `${process.env.IMAGEKIT_URL_ENDPOINT}/pratos/${product.imageUrl}_${product.updateTimes}`,
      price: String(product.price).includes('.')
        ?
        String(product.price).split('.')[1].length == 2
          ?
          String(product.price).replace('.', ',')
          :
          String(product.price).replace('.', ',') + '0'
        :
        String(product.price) + ',00',
      availability: product.availability,
      priceForTwo:
        String(product.priceForTwo).includes('.')
          ?
          String(product.priceForTwo).split('.')[1].length == 2
            ?
            String(product.priceForTwo).replace('.', ',')
            :
            String(product.priceForTwo).replace('.', ',') + '0'
          :
          String(product.priceForTwo) + ',00',
      updateTimes: product.updateTimes
    };
  },

  renderMany(products: Product[]) {
    return products.map(product => this.render(product))
  }
};