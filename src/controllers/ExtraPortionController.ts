import { Request, Response } from 'express';
import { object, string, number, boolean, ValidationError } from 'yup';
import prismaClient from '../database/prismaClient';

let extraPortionSchema = object({
  name: string().required(),
  price: number().required(),
});

export default {
  async create(request: Request, response: Response) {
    await prismaClient.$connect();
    const {
      name,
      price
    } = request.body;

    const extraPortion = {
      name,
      price
    };

    await extraPortionSchema.validate(extraPortion, {
      abortEarly: false
    }).then(async () => {
      await prismaClient.extraPortion.create({
        data: extraPortion
      });

      return response.status(201).json({ message: 'Porção extra adicionada com sucesso!' })
    }).catch((err: ValidationError) => {
      return response.status(400).json(err.errors);
    });
  },

  async index(request: Request, response: Response) {
    await prismaClient.$connect();

    try {
      const extraPortions = await prismaClient.extraPortion.findMany();

      return response.status(200).json(extraPortions)
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Erro interno do servidor!' })
    }
  },

  async show(request: Request, response: Response) {
    await prismaClient.$connect();
    const { id } = request.params;

    try {
      const extraPortion = await prismaClient.extraPortion.findUnique({
        where: { id }
      });

      return response.status(200).json(extraPortion);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ message: 'Houve um erro com sua requisição. Tente novamente mais tarde.' })
    }
  },

  async update(request: Request, response: Response) {
    await prismaClient.$connect()
    const {
      name,
      price
    } = request.body;

    const { id } = request.params;

    const data = {
      name,
      price
    };

    await extraPortionSchema.validate(data, {
      abortEarly: false
    }).then(async () => {
      try {
        const extraPortion = await prismaClient.extraPortion.findUnique({
          where: { id }
        });

        await prismaClient.extraPortion.update({
          where: { id },
          data: {
            name: `${data.name !== '' && data.name !== undefined ? data.name : extraPortion?.name}`,
            price: data.price !== 0 && data.price !== undefined ? data.price : extraPortion?.price,
          }
        });

        return response.status(200).json({ message: 'Porção extra atualizada com sucesso.' })
      } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Erro interno do servidor.' })
      };
    }).catch((err: ValidationError) => {
      return response.status(400).json(err.errors);
    });
  },

  async delete(request: Request, response: Response) {
    await prismaClient.$connect();
    const { id } = request.params;

    await prismaClient.extraPortion.delete({
      where: { id }
    }).then(() => {
      return response.status(200).json({ message: 'Porção extra deletada com sucesso!' })
    }).catch((err) => {
      console.log(err);
      return response.status(500).json({message: 'Erro interno do servidor, tente novamente mais tarde.'});
    })
  },
}