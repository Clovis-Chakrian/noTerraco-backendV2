import { Wine } from "@prisma/client";

export default {
  render(wine: Wine) {
    return {
      id: wine.id,
      name: wine.name,
      country: wine.country,
      imageUrl: `${process.env.IMAGEKIT_URL_ENDPOINT}/vinhos/${wine.imageUrl}_${wine.updateTimes}`,
      glassPrice: String(wine.glassPrice).includes('.')
        ?
        String(wine.glassPrice).split('.')[1].length == 2
          ?
          String(wine.glassPrice).replace('.', ',')
          :
          String(wine.glassPrice).replace('.', ',') + '0'
        :
        String(wine.glassPrice) + ',00',
      availability: wine.availability,
      bottlePrice:
        String(wine.bottlePrice).includes('.')
          ?
          String(wine.bottlePrice).split('.')[1].length == 2
            ?
            String(wine.bottlePrice).replace('.', ',')
            :
            String(wine.bottlePrice).replace('.', ',') + '0'
          :
          String(wine.bottlePrice) + ',00',
      updateTimes: wine.updateTimes
    };
  },

  renderMany(wines: Wine[]) {
    return wines.map(wine => this.render(wine))
  }
};