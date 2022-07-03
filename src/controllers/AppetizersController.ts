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
      image: string().required(),
      price: number().required(),
      availability: boolean().required(),
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
      uploadImage(base64, `${fileName}_${appetizer.updateTimes}`, '/entradinhas')

      await prismaClient.appetizers.create({
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
        const appetizer = await prismaClient.appetizers.findMany({
          where: { name }
        });

        return response.status(200).json({ appetizer })
      } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'erro interno do servidor!' });
      }
    } else {
      try {
        const appetizers = await prismaClient.appetizers.findMany();

        return response.status(200).json({appetizers});
      } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  },

  async show(request: Request, response: Response) { },

  async update(request: Request, response: Response) { },

  async delete(request: Request, response: Response) { },
}