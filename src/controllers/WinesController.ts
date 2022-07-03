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
        console.log(error);
        return response.status(500).json({ message: 'Erro interno do servidor!' });
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

  async update(request: Request, response: Response) {
    await prismaClient.$connect();

    const {
      name,
      glassPrice,
      wineCost,
      image,
      country,
      availability,
      updateTimes
    } = request.body as {
      name: string,
      glassPrice: number
      wineCost: number
      image: string
      country: string
      availability: boolean
      updateTimes: Number
    };

    const { id } = request.params;

    if (request.body === undefined) return response.status(400).json({ message: 'Não foi passado nenhum dado para ser atualizado' });

    const data = {
      name,
      glassPrice: Number(glassPrice),
      bottlePrice: Number((wineCost + wineCost * 0.8).toFixed(2)),
      image,
      country,
      availability,
      updateTimes
    };

    try {
      const wine = await prismaClient.wine.findUnique({
        where: { id }
      });

      if (wine) {
        if (image !== '' && image !== undefined) {
          const base64 = image.replace(/^data:image\/jpeg;base64,/, "");
          const fileName = removeSpecialCharacters(wine.name.replace(/ /g, '_'));
          const newImgName = data.name ? removeSpecialCharacters(data.name.replace(/ /g, '_')) : console.log('sem novos nomes');
          updateImages(`${fileName}_${wine.updateTimes}`, base64, `${data.name !== '' && data.name !== undefined ? newImgName : fileName}_${wine.updateTimes + 1}`, `vinhos`);
        };

        const newImgName = data.name ? removeSpecialCharacters(data.name.replace(/ /g, '_')) : console.log('sem novos nomes');

        await prismaClient.wine.update({
          where: { id },
          data: {
            name: `${data.name !== '' && data.name !== undefined ? data.name : wine.name}`,
            glassPrice: data.glassPrice !== 0 && data.glassPrice !== undefined ? data.glassPrice : wine.glassPrice,
            bottlePrice: data.bottlePrice !== 0 && data.bottlePrice !== undefined ? data.bottlePrice : wine.bottlePrice,
            imageUrl: `${data.name !== '' && data.name !== undefined && image !== '' && image !== undefined ? newImgName : wine.imageUrl}`,
            country: `${data.country !== '' && data.country !== undefined ? data.country : wine.country}`,
            availability: data.availability,
            updateTimes: image !== '' && image !== undefined ? wine.updateTimes + 1 : wine.updateTimes
          }
        });

        return response.status(200).json({ message: 'Produto atualizado com sucesso!' });
      };
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Erro interno do servidor!' })
    };
  },

  async delete(request: Request, response: Response) {
    await prismaClient.$connect()
    const { id } = request.params

    try {
      const wine = await prismaClient.wine.findUnique({
        where: { id },
      });

      if (wine) {
        await prismaClient.wine.delete({
          where: { id }
        }).then(() => {
          const fileName = removeSpecialCharacters(wine.name.replace(/ /g, '_'));
          deleteFile(`${fileName}_${wine.updateTimes}`)
        }).catch(err => {
          console.log(err);
          return response.status(500).json({message: 'Erro interno do servidor'});
        });

        return response.status(200).json({ message: `${wine.name} deletado com sucesso!` })
      }
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Erro interno do servidor' });
    }
  },
}