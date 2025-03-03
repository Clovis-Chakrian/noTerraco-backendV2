import { Provider } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Product } from "src/domain/products/product.entity";
import { ProductSchema } from "./product.schema";
import { ProductRepository } from "./product.respository";

export const productProviders = {
  providers: [
    {
      provide: 'PRODUCT_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository<Product>(ProductSchema),
      inject: ['DATA_SOURCE'],
    } as Provider,
  ],
  repositories: [
    ProductRepository as Provider,
  ]
}