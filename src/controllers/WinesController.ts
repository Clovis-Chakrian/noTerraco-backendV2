import { Request, Response } from 'express';
import { deleteFile, updateImages, uploadImage } from '../services/imageKit';
import { object, string, number, boolean, ValidationError } from 'yup';
import prismaClient from '../database/prismaClient';
import removeSpecialCharacters from '../utils/removeSpecialCharacters';

export default {
  async create(request: Request, response: Response) {
    await prismaClient.$connect()
    const {
      name,
      glassPrice,
      wineCost,
      country,
      image,
      availability,
    } = request.body;

    let wineSchema = object({
      name: string().required(),
      glassPrice: number().required(),
      bottlePrice: number().required(),
      imageUrl: string().required(),
      country: string().required(),
      availability: boolean().required(),
    });

    const base64 = image.replace(/^data:image\/jpeg;base64,/, "");
    const fileName = `${removeSpecialCharacters(name.replaceAll(' ', '_'))}`;

    const wine = {
      name,
      glassPrice,
      bottlePrice: Number((Number(wineCost) + Number(wineCost) * 0.8).toFixed(2)),
      availability,
      imageUrl: fileName,
      country,
      updateTimes: 1
    }

    await wineSchema.validate(wine, {
      abortEarly: false
    }).then(async () => {
      uploadImage(base64, `${fileName}_${wine.updateTimes}`, '/vinhos')

      await prismaClient.wine.create({
        data: wine,
      });

      return response.status(201).json({ message: 'Vinho adicionado com sucesso!' });
    }).catch((err: ValidationError) => {
      return response.status(400).json(err.errors);
    });
  },

  async index(request: Request, response: Response) {
    await prismaClient.$connect()
    const {
      name,
      country
    } = request.query as {
      name: string,
      country: string
    };

    if (name) {
      try {
        const wine = await prismaClient.wine.findMany({
          where: { name, country }
        })

        return response.status(200).json({ wine });
      } catch (error) {

      }
    } else {
      try {
        const wines = await prismaClient.wine.findMany({
          where: { country }
        });

        return response.status(200).json({ wines })
      } catch (error) {
        console.log(error)
        return response.status(500).json({ message: "Erro interno do servidor!" })
      }
    }
  },

  async test(request: Request, response: Response) {
    return response.redirect('https://noterraco.vercel.app/menu')
  },

  async show(request: Request, response: Response) {
    await prismaClient.$connect();

    const { id } = request.params;

    try {
      const wine = await prismaClient.wine.findUnique({
        where: { id }
      });

      return response.status(200).json({ wine });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: "Erro interno do servidor!" });
    };
  },
}