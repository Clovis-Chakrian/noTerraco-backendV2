import { Product } from '@prisma/client';
import { response } from 'express';
import { ValidationError, number, object, string } from 'yup';

export class ProductValidation {
  public async validate(product: Product) {
    if (product.type === "Porções extras") {
      return await this.validateExtraPortion(product);
    };

    if (product.type === "Principais") {
      return await this.validateMainDishe(product);
    };

    return await this.validateDishe(product);
  };

  private async validateDishe(product: Product) {
    const disheValidation = object({
      name: string().required('O nome do produto é obrigatório.'),
      type: string().required('O tipo do produto é obrigatório.'),
      price: number().required('O preço é obrigatório.'),
      description: string().required("A descrição é obrigatória."),
    });

    return await disheValidation.validate(product, {
      abortEarly: false
    })
      .then(response => {
        const validationReturn = {
          success: true,
          data: { ...response },
          errors: []
        }

        return validationReturn;
      })
      .catch((errors: ValidationError) => {
        const validationReturn = {
          success: false,
          data: null,
          errors: errors.errors
        }

        return validationReturn;
      });
  };

  private async validateMainDishe(product: Product) {
    const mainDisheValidation = object({
      name: string().required('O nome do produto é obrigatório.'),
      type: string().required('O tipo do produto é obrigatório.'),
      subtype: string().required('O subtipo do produto é obrigatório.'),
      price: number().required('O preço é obrigatório.'),
      priceForTwo: number().required('O preço para dois é obrigatório.'),
      description: string().required("A descrição é obrigatória."),
    });

    return await mainDisheValidation.validate(product, {
      abortEarly: false
    })
      .then(response => {
        const validationReturn = {
          success: true,
          data: { ...response },
          errors: []
        }

        return validationReturn;
      })
      .catch((errors: ValidationError) => {
        const validationReturn = {
          success: false,
          data: null,
          errors: errors.errors
        }

        return validationReturn;
      });
  };

  private async validateExtraPortion(product: Product) {
    const extraPortionValidation = object({
      name: string().required('O nome do produto é obrigatório.'),
      type: string().required('O tipo do produto é obrigatório.'),
      price: number().required('O preço é obrigatório.'),
    });

    return await extraPortionValidation.validate(product, {
      abortEarly: false
    })
      .then(response => {
        const validationReturn = {
          success: true,
          data: { ...response },
          errors: []
        }

        return validationReturn;
      })
      .catch((errors: ValidationError) => {
        const validationReturn = {
          success: false,
          data: null,
          errors: errors.errors
        }

        return validationReturn;
      });
  };
}