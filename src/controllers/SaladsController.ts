import { Request, Response } from 'express';
import { deleteFile, updateImages, uploadImage } from '../services/imageKit';
import { object, string, number, boolean, ValidationError } from 'yup';
import prismaClient from '../database/prismaClient';
import removeSpecialCharacters from '../utils/removeSpecialCharacters';

export default {
  async create(request: Request, response: Response) {
    await prismaClient.$connect();
    const {
      name,
      subtype,
      description,
      image,
      price,
      availability
    } = request.body;

    let SaladsSchema = object({
      name: string().required(),
      subtype: string().required(),
      description: string().required(),
      imageURL: string().required(),
      price: number().required(),
      availability: number().required()
    });

    const base64 = image.replace(/^data:image\/jpeg;base64,/, "");
    const fileName = `${removeSpecialCharacters(name.replaceAll(' ', '_'))}`;

    const salad = {
      name,
      subtype,
      description,
      imageURL: fileName,
      price,
      availability,
      updateTimes: 1
    };

    await SaladsSchema.validate(salad, {
      abortEarly: false
    }).then(async () => {
      uploadImage(base64, `${fileName}_${salad.updateTimes}`, '/saladas');

      await prismaClient.salad.create({
        data: salad
      });

      return response.status(201).json({ message: 'Prato adicionada com sucesso!' })
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
        const salad = await prismaClient.salad.findMany({
          where: { name }
        });

        return response.status(200).json(salad)
      } catch (error) {
        console.log(error);
        return response.status(400).json({ message: 'Essa não! Parece que houve um erro com sua solicitação.' })
      }
    } else {
      try {
        const salads = await prismaClient.salad.findMany()

        return response.status(200).json(salads);
      } catch (error) {
        return response.status(500).json({ message: 'Erro interno do servidor.' })
      }
    }
  },

  async show(request: Request, response: Response) {
    await prismaClient.$connect();
    const { id } = request.params;

    try {
      const salad = await prismaClient.salad.findUnique({
        where: { id }
      });

      return response.status(200).json(salad);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: "Erro interno do servidor." })
    }
  },

  async update(request: Request, response: Response) { },

  async delete(request: Request, response: Response) { },
}