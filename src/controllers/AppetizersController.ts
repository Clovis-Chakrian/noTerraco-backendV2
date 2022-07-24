import { Request, Response } from 'express';
import { deleteFile, updateImages, uploadImage } from '../services/imageKit';
import { object, string, number, boolean, ValidationError } from 'yup';
import prismaClient from '../database/prismaClient';
import removeSpecialCharacters from '../utils/removeSpecialCharacters';

export default {
  async create(request: Request, response: Response) {
    prismaClient.$connect();
    const {
      name,
      description,
      image,
      price,
      availability,
    } = request.body;

    let appetizersSchema = object({
      name: string().required(),
      description: string().required(),
      imageURL: string().required(),
      price: number().required(),
      availability: boolean().required(),
      updateTimes: number().required()
    });

    const base64 = image.replace(/^data:image\/jpeg;base64,/, "");
    const fileName = `${removeSpecialCharacters(name.replaceAll(' ', '_'))}`;

    const appetizer = {
      name,
      description,
      imageURL: fileName,
      price,
      availability,
      updateTimes: 1
    };

    await appetizersSchema.validate(appetizer, {
      abortEarly: false
    }).then(async () => {
      uploadImage(base64, `${fileName}_${appetizer.updateTimes}`, '/entradinhas');

      await prismaClient.appetizer.create({
        data: appetizer
      });

      return response.status(201).json({ message: 'Entradinha adicionada com sucesso!' })
    }).catch((err: ValidationError) => {
      return response.status(400).json(err.errors);
    });
  },

  async index(request: Request, response: Response) {
    await prismaClient.$connect();
    const { name } = request.query as {
      name: string
    };

    if (name) {
      try {
        const appetizer = await prismaClient.appetizer.findMany({
          where: { name }
        });

        return response.status(200).json(appetizer)
      } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'erro interno do servidor!' });
      }
    } else {
      try {
        const appetizers = await prismaClient.appetizer.findMany();

        return response.status(200).json(appetizers);
      } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  },

  async show(request: Request, response: Response) {
    await prismaClient.$connect()
    const { id } = request.params;

    try {
      const appetizer = await prismaClient.appetizer.findUnique({
        where: { id }
      });
  
      return response.status(200).json(appetizer);
    } catch (error) {
      console.log(error)
      return response.status(400).json({ message: 'Entradinha não encontrada.' })
    }
  },

  async update(request: Request, response: Response) {
    await prismaClient.$connect();

    const {
      name,
      description,
      image,
      price,
      availability
    } = request.body as {
      name: string,
      description: string,
      image: string,
      price: number,
      availability: boolean
    };

    const { id } = request.params;

    if (request.body === undefined) return response.status(400).json({ message: 'Não foi passado nenhum dado para ser atualizado' });

    const data = {
      name,
      description,
      price,
      availability
    };

    try {
      const appetizer = await prismaClient.appetizer.findUnique({
        where: { id }
      });

      if (appetizer) {
        if (image !== '' && image !== undefined) {
          const base64 = image.replace(/^data:image\/jpeg;base64,/, "");
          const fileName = removeSpecialCharacters(appetizer.name.replace(/ /g, '_'));
          const newImgName = data.name ? removeSpecialCharacters(data.name.replace(/ /g, '_')) : console.log('sem novos nomes');
          updateImages(`${fileName}_${appetizer.updateTimes}`, base64, `${data.name !== '' && data.name !== undefined ? newImgName : fileName}_${appetizer.updateTimes + 1}`, `entradinhas`);
        };

        const newImgName = data.name ? removeSpecialCharacters(data.name.replace(/ /g, '_')) : console.log('sem novos nomes');

        await prismaClient.appetizer.update({
          where: { id },
          data: {
            name: `${data.name !== '' && data.name !== undefined ? data.name : appetizer.name}`,
            description: `${data.name !== '' && data.name !== undefined ? data.name : appetizer.name}`,
            price: data.price !== 0 && data.price !== undefined ? data.price : appetizer.price,
            imageURL: `${data.name !== '' && data.name !== undefined && image !== '' && image !== undefined ? newImgName : appetizer.imageURL}`,
            availability: data.availability,
            updateTimes: image !== '' && image !== undefined ? appetizer.updateTimes + 1 : appetizer.updateTimes
          }
        })
      };
    } catch (err) {
      console.log(err);
      return response.status(500).json({ message: "Erro interno do servidor!" });
    }
  },

  async delete(request: Request, response: Response) {
    await prismaClient.$connect()
    const { id } = request.params

    try {
      const appetizer = await prismaClient.appetizer.findUnique({
        where: { id },
      });

      if (appetizer) {
        await prismaClient.appetizer.delete({
          where: { id }
        }).then(() => {
          const fileName = removeSpecialCharacters(appetizer.name.replace(/ /g, '_'));
          deleteFile(`${fileName}_${appetizer.updateTimes}`, '/entradinhas/')
        }).catch((err: any) => {
          console.log(err);
          return response.status(500).json({ message: 'Erro interno do servidor' });
        });

        return response.status(200).json({ message: `${appetizer.name} deletado com sucesso!` })
      }
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Erro interno do servidor' });
    }
   },
}