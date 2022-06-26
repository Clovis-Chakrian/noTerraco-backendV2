import { Request, Response } from 'express'
import productsView from '../views/products_view';
import { deleteFile, updateImages, uploadImage } from '../services/imageKit';
import * as Yup from 'yup';
import prismaClient from '../database/prismaClient';

//the normalize function does not work when i used, so i made this
function removeSpecialCharacters(text: string) {
  text = text.toLowerCase();
  text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
  text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
  text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
  text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
  text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
  text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
  return text;
};

export default {
  async create(request: Request, response: Response) {
    await prismaClient.$connect()
    const {
      name,
      type,
      subtype,
      description,
      memory,
      image,
      price,
      availability
    } = request.body;

    const schema = Yup.object().shape({
      name: Yup.string().required('O campo nome é requerido.'),
      type: Yup.string().required('O campo tipo é requerido.'),
      subtype: Yup.string(),
      description: Yup.string().notRequired(),
      memory: Yup.string(),
      imageUrl: Yup.string().notRequired(),
      price: Yup.string().required('O campo preço é requerido.'),
      availability: Yup.boolean().required()
    });

    const base64 = image.replace(/^data:image\/jpeg;base64,/, "");
    const fileName = `${removeSpecialCharacters(name.replaceAll(' ', '_'))}`;

    if (type == 'Porções extras') {
      const product = {
        name,
        type,
        subtype: 'sem subtipo para esse',
        description: 'sem descrição para esse',
        memory: 'sem lembrança para esse',
        imageUrl: 'Sem imagem para esse',
        price: Number(price),
        availability,
        priceForTwo: Number((Number(price) + Number(price) * 0.7).toFixed(2)),
        updateTimes: 1
      };

      await schema.validate(product, {
        abortEarly: false
      }).catch((err: Yup.ValidationError) => {
        return response.status(400).json(err.errors);
      });

      await prismaClient.product.create({
        data: product
      })

      return response.status(201).json({ message: 'Produto criado com sucesso!' });
    }

    const product = {
      name,
      type,
      subtype,
      description,
      memory,
      imageUrl: fileName,
      price: Number(price),
      availability,
      priceForTwo: Number((Number(price) + Number(price) * 0.7).toFixed(2)),
      updateTimes: 1
    };

    await schema.validate(product, {
      abortEarly: false
    }).catch((err: Yup.ValidationError) => {
      return response.status(400).json(err.errors);
    });

    uploadImage(base64, `${fileName}_${product.updateTimes}`, '/pratos');

    await prismaClient.product.create({
      data: product
    })

    return response.status(201).json({ message: 'Produto criado com sucesso!' });
  },

  async index(request: Request, response: Response) {
    await prismaClient.$connect()

    const {
      name,
      type 
    } = request.query as {
        name: string,
        type: string
      };

    if (name) {
      try {
        const product = await prismaClient.product.findMany({
          where: { name, type }
        });

        return response.status(200).json(productsView.renderMany(product))
      } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Erro interno do servidor' });
      }
    } else {
      try {
        const products = await prismaClient.product.findMany({
          where: { type },
          
        });

        return response.status(200).json(productsView.renderMany(products))
      } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Erro interno do servidor' });
      }
    };
  },


  async show(request: Request, response: Response) {
    await prismaClient.$connect()
    const { id } = request.params;

    try {
      const product = await prismaClient.product.findUnique({
        where: { id }
      });

      return response.status(200).json(product ? productsView.render(product) : { message: "Produto não encontrado." });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Erro interno do servidor' });
    };
  },

  async update(request: Request, response: Response) {
    await prismaClient.$connect()

    const {
      name,
      type,
      subtype,
      description,
      memory,
      image,
      price,
      availability
    } = request.body as {
      name: string,
      type: string,
      subtype: string,
      description: string,
      memory: string,
      image: string,
      price: number,
      availability: boolean
    };

    const { id } = request.params;

    if (request.body === undefined) return response.status(400).json({ message: 'Não foi passado nenhum dado para ser atualizado' });

    const data = {
      name,
      type,
      subtype,
      description,
      memory,
      price: Number(price),
      availability
    };

    try {
      const product = await prismaClient.product.findUnique({
        where: { id }
      });

      if (product) {

        if (image !== '' && image !== undefined) {
          const base64 = image.replace(/^data:image\/jpeg;base64,/, "");
          const fileName = removeSpecialCharacters(product.name.replace(/ /g, '_'));
          const newImgName = data.name ? removeSpecialCharacters(data.name.replace(/ /g, '_')) : console.log('sem novos nomes');
          updateImages(`${fileName}_${product.updateTimes}`, base64, `${data.name !== '' && data.name !== undefined ? newImgName : fileName}_${product.updateTimes + 1}`, `pratos`);
        };

        const newImgName = data.name ? removeSpecialCharacters(data.name.replace(/ /g, '_')) : console.log('sem novos nomes');

        await prismaClient.product.update({
          where: { id },
          data: {
            name: `${data.name !== '' && data.name !== undefined ? data.name : product.name}`,
            type: `${data.type !== '' && data.type !== undefined ? data.type : product.type}`,
            subtype: `${data.subtype !== '' && data.subtype !== undefined ? data.subtype : product.subtype}`,
            imageUrl: `${data.name !== '' && data.name !== undefined && image !== '' && image !== undefined ? newImgName : product.imageUrl}`,
            description: `${data.description !== '' && data.description !== undefined ? data.description : product.description}`,
            memory: `${data.memory !== '' && data.memory !== undefined ? data.memory : product.memory}`,
            price: data.price !== 0 ? data.price : product.price,
            availability: data.availability,
            priceForTwo: data.price !== 0 ? Number((data.price + data.price * 0.7).toFixed(2)) : product.priceForTwo,
            updateTimes: image !== '' && image !== undefined ? product.updateTimes + 1 : product.updateTimes
          }
        });

        return response.status(200).json({ message: 'Produto atualizado com sucesso!' });
      }
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  async delete(request: Request, response: Response) {
    await prismaClient.$connect();
    const { id } = request.params;

    try {
      const product = await prismaClient.product.findUnique({
        where: { id }
      });

      if (product) {

        await prismaClient.product.delete({
          where: { id }
        }).then(() => {
          const fileName = removeSpecialCharacters(product.name.replace(/ /g, '_'));
          deleteFile(`${fileName}_${product.updateTimes}`);
        }).catch((err: any) => {
          console.error(err);
        });

        return response.status(200).json({ message: `${product.name} deletado com sucesso!` })
      }
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Erro interno do servidor' });
    }
  },
};