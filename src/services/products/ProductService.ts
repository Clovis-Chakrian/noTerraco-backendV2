import { PrismaClient, Product } from "@prisma/client";
import PrismaClientService from "../../database/prismaClient";
import { Request, Response } from "express";
import { ProductListDto } from "../../dtos/products/ProductListDto";
import { ImageService } from "../images/ImageService";
import { ProductValidation } from "../../validations/ProductValidation";
import { GenericReturnDto } from "../../dtos/generics/GenericReturnDto";

export class ProductService {
  private readonly prismaClientService: PrismaClient;
  private readonly imageService: ImageService;
  private readonly productValidation: ProductValidation;

  constructor() {
    this.prismaClientService = PrismaClientService;
    this.imageService = new ImageService();
    this.productValidation = new ProductValidation();
  }

  create = async (request: Request, response: Response) => {
    const validationReturn = await this.productValidation.validate(request.body);

    if (!validationReturn.success || validationReturn.data == null) {
      return response.status(400).json(validationReturn);
    }

    const product = {
      ...validationReturn.data,
      availability: true
    }

    await this.prismaClientService.$connect();

    if (product?.type === "Porções extras") {
      const [savedProduct] = await this.prismaClientService.$transaction([
        this.prismaClientService.product.create({
          data: {
            ...product
          }
        })
      ])

      return response.status(201).json(new GenericReturnDto(true, savedProduct.id, []));
    };

    if (!request.file) {
      return response.status(201).json(new GenericReturnDto(false, null, ["É necessário que seja enviada uma imagem para criar o produto."]));
    }

    const uploadImageResponse = await this.imageService.upload(request.file, product.name, product.type);

    if (!uploadImageResponse.success) {
      return response.status(500).json(uploadImageResponse);
    }

    await this.prismaClientService.$transaction([
      this.prismaClientService.product.create({
        data: {
          ...product,
          imageUrl: uploadImageResponse.data.fileUrl,
          imageId: uploadImageResponse.data.fileId
        }
      })
    ])
      .then(([savedProduct]) => {
        return response.status(201).json(new GenericReturnDto(true, savedProduct.id, []));
      })
      .catch((error) => {
        return response.status(500).json(new GenericReturnDto(false, null, [error]));
      })
  };

  getAll = async (request: Request, response: Response) => {
    await this.prismaClientService.$connect();

    await this.prismaClientService.product.findMany()
      .then((products) => {
        const productsListDto = products.map(product => new ProductListDto(product));

        return response.status(200).json(new GenericReturnDto(true, productsListDto, []));
      })
      .catch((error) => {
        return response.status(200).json(new GenericReturnDto(false, null, [error]));
      });
  };

  getById(request: Request, response: Response) {
    // return new ProductListDto("asd", "qer", "asd");
  };

  update(request: Request, response: Response) {
    return "";
  };
}