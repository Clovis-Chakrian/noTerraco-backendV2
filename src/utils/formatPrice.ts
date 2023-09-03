export default {
  format(price: string) {
    //const price = String(price);
    if (price.includes('.')) {
      if (price.split('.')[1].length == 2) {
        const formatedPrice = price.replace('.', ',');

        return formatedPrice;
      } else {
        const formatedPrice = price.replace('.', ',') + '0';

        return formatedPrice;
      }
    } else {
      const formatedPrice = price + ',00'

      return formatedPrice;
    };
  }
};