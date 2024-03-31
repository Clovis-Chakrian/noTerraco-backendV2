export default {
  format(price: number | null) {
    if (price == null) {
      return ""
    };

    const priceAsString = String(price);
    if (priceAsString.includes('.')) {
      if (priceAsString.split('.')[1].length == 2) {
        const formatedPrice = priceAsString.replace('.', ',');

        return formatedPrice;
      } else {
        const formatedPrice = priceAsString.replace('.', ',') + '0';

        return formatedPrice;
      }
    } else {
      const formatedPrice = priceAsString + ',00'

      return formatedPrice;
    };
  }
};