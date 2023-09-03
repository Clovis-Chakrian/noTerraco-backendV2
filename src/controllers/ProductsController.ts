import { Request, Response } from 'express'
import productsView from '../views/products_view';
//import { deleteFile, updateImages, uploadImage } from '../services/imageKit';
import prismaClient from '../database/prismaClient';
import removeSpecialCharacters from '../utils/removeSpecialCharacters';
import { productSchema } from '../yupSchemas/products_schema';
import { ValidationError } from 'yup';
import imagekit from '../config/imagekit';

export default {
  async create(request: Request, response: Response) {
    await prismaClient.$connect()
    const data = request.body;

    await productSchema.validate(data, {
      abortEarly: false
    }).then(async () => {
      if (data.type == 'Porções extras') {
        const product = {
          ...data,
          availability: true
        };

        await prismaClient.product.create({
          data: {
            ...product
          }
        }).then((product) => {
          return response.status(201).json({
            message: `${product.name} adicionado(a) com sucesso.`
          });
        }).catch((err) => {
          console.error(err);
          return response.status(500).json({
            message: 'Houve um erro ao criar o produto. Tente novamente mais tarde.',
            errors: err
          });
        });
      };

      if (!request.file) {
        return response.status(400).json({
          message: 'Você deve anexar uma imagem para criar um produto que não seja do tipo porção extra.'
        });
      }

      const file = request.file;

      await imagekit.upload({
        file: file.buffer,
        fileName: `${removeSpecialCharacters(data.name.replaceAll(' ', '_'))}-${Date.now()}`,
        folder: `${data.type === 'Saladas, vegetarianos & veganos' ?
          'saladas'
          :
          data.type === 'Porções extra' ?
            'extra'
            :
            data.type
          }`,
        useUniqueFileName: false
      }).then(async (imageData) => {
        const product = {
          ...data,
          imageUrl: imageData.url,
          imageId: imageData.fileId,
          availability: true
        };

        await prismaClient.product.create({
          data: {
            ...product
          }
        }).then(resp => {
          return response.status(201).json({
            message: `${resp.name} adicionado(a) com sucesso.`
          });
        }).catch(err => {
          console.error(err);
          return response.status(500).json({
            message: 'Houve um erro ao salvar o produto. Tente novamente mais tarde.'
          });
        });
      }).catch(err => {
        console.log(err);
        return response.status(500).json({
          message: 'Não foi possível criar o produto pois houve um erro ao fazer upload da imagem.'
        });
      });
    }).catch((err: ValidationError) => {
      console.error(err);
      return response.status(400).json({
        message: 'Houve um erro ao validar os campos recebidos.',
        errors: err.errors
      });
    });
  },

  async createMany(request: Request, response: Response) {
    await prismaClient.$connect();
  },

  async index(request: Request, response: Response) {
    await prismaClient.$connect()

    await prismaClient.product.findMany().then((products) => {
      return response.status(200).json(productsView.renderMany(products));
    }).catch(err => {
      console.error(err);
      return response.status(500).json({
        message: 'Houve um erro ao buscar os produtos. Tente novamente mais tarde.'
      });
    });
  },

  async show(request: Request, response: Response) {
    await prismaClient.$connect()
    const { id } = request.params;

    await prismaClient.product.findUnique({
      where: { id }
    }).then(product => {
      if (!product) {
        return response.status(400).json({
          message: 'Produto não encontrado.'
        });
      };

      return response.status(200).json(productsView.render(product));
    }).catch(err => {
      console.error(err);
      return response.status(500).json({
        message: 'Houve um erro ao buscar o produto. Tente novamente mais tarde.'
      });
    });
  },

  async update(request: Request, response: Response) {
    console.log('Request received!')
    await prismaClient.$connect()

    const { id } = request.params;

    const data = request.body;

    if (!request.file) {
      await prismaClient.product.update({
        where: { id },
        data: {
          ...data
        }
      }).then(() => {
        return response.status(200).json({
          message: 'Produto atualizado com sucesso.'
        });
      }).catch(err => {
        console.error(err);
        return response.status(500).json({
          message: 'Houve um erro ao atualizar o produto. Tente novamente mais tarde.'
        });
      });
    };

    if (request.file) {
      const image = request.file;

      await prismaClient.product.findUnique({
        where: { id }
      }).then(async (product) => {
        if (product) {
          await imagekit.deleteFile(`${product?.imageId}`).then(async () => {

            await imagekit.upload({
              file: image.buffer,
              fileName: `${removeSpecialCharacters(product?.name.replaceAll(' ', '_'))}-${Date.now()}`,
              folder: `${product?.type}`,
              useUniqueFileName: false
            }).then(async (imageData) => {
              const updatedProduct = {
                ...data,
                imageUrl: imageData.url,
                imageId: imageData.fileId
              };

              await prismaClient.product.update({
                where: { id },
                data: {
                  ...updatedProduct
                }
              }).then(resp => {
                return response.status(200).json({
                  message: `${resp.name} atualizado(a) com sucesso.`
                });
              }).catch(err => {
                console.error(err);
                return response.status(500).json({
                  message: 'Houve um erro ao atualizar o produto. Tente novamente mais tarde.'
                });
              });

            }).catch(err => {
              console.error(err);
              return response.status(500).json({
                message: 'Houve um erro ao salvar a nova imagem. Tente novamente mais tarde.'
              });
            });

          }).catch(err => {
            console.error(err);
            return response.status(500).json({
              message: 'Não foi possível atualizar o produto pois houve um erro ao alterar a imagem. Tente novamente mais tarde.'
            });
          });
        } else {
          return response.status(404).json({
            message: 'Não foi possível achar o item para atualizá-lo. Erro 404'
          });
        }

      }).catch(err => {
        console.error(err);
        return response.status(500).json({
          message: 'Houve um erro ao encontrar o produto para atualizar. Tente novamente mais tarde.'
        });
      });
    }
  },

  async delete(request: Request, response: Response) {
    await prismaClient.$connect();
    const { id } = request.params;

    await prismaClient.product.findUnique({
      where: { id }
    }).then(async product => {
      if (product?.imageId) {
        await imagekit.deleteFile(product?.imageId).then(async () => {
          await prismaClient.product.delete({
            where: { id }
          }).then(() => {
            return response.status(200).json({
              message: 'Produto deletado com sucesso.'
            });
          }).catch(err => {
            console.error(err);
            return response.status(500).json({
              message: 'Houve um erro ao deletar o produto. Tente novamente mais tarde.'
            });
          });

        }).catch(err => {
          console.error(err);
          return response.status(500).json({
            message: 'Não foi possível deletar o produto pois houve um erro ao deletar a imagem. Tente novamente mais tarde.'
          });
        });
      };

      await prismaClient.product.delete({
        where: { id }
      });
    });
  },
};