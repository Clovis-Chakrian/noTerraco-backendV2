import { Provider } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Category } from "src/domain/categories/category.entity";
import { CategorySchema } from "./category.schema";
import { CategoryRepository } from "./category.repository";

export const categoryProviders = {
  providers: [
    {
      provide: 'CATEGORY_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository<Category>(CategorySchema),
      inject: ['DATA_SOURCE'],
    } as Provider,
  ],
  repositories: [
    CategoryRepository as Provider,
  ]
}