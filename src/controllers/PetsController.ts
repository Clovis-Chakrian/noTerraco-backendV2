import { Request, Response } from 'express';
import { object, string, number, boolean, ValidationError, bool } from 'yup';
import prismaClient from '../database/prismaClient';

let petsSchema = object({
  name: string().required(),
  description: string().required(),
  price: number().required(),
  availability: boolean().required()
})

export default {
  async create(request: Request, response: Response) {
    await prismaClient.$connect();
    const {
      name,
      price,
      description,
    } = request.body;

    const pet = {
      name,
      price,
      description,
      availability: true
    };

    await petsSchema.validate(pet, {
      abortEarly: false
    }).then(async () => {
      await prismaClient.pets.create({
        data: pet
      });

      return response.status(201).json({ message: 'Produto cadastrado com sucesso!' })
    }).catch((err: ValidationError) => {
      return response.status(400).json(err.errors);
    });
  },

  async index(request: Request, response: Response) {
    await prismaClient.$connect();

    try {
      const pets = await prismaClient.pets.findMany();

      return response.status(200).json(pets)
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Erro interno do servidor.' })
    }
  },

  async show(request: Request, response: Response) {
    await prismaClient.$connect();
    const { id } = request.params;

    try {
      const pet = await prismaClient.pets.findUnique({
        where: { id }
      });

      return response.status(200).json(pet);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Erro interno do servidor.' });
    };
  },

  async update(request: Request, response: Response) {
    await prismaClient.$connect();
    const {
      name,
      price,
      description,
      availability
    } = request.body as {
      name: string,
      price: number,
      description: string,
      availability: boolean
    };

    const { id } = request.params;

    const data = {
      name,
      price,
      description,
      availability
    };

    try {
      const pet = await prismaClient.pets.findUnique({
        where: { id }
      })

      await prismaClient.pets.update({
        where: { id },
        data: {
          name: `${data.name !== '' && data.name !== undefined ? data.name : pet?.name}`,
          price: data.price !== 0 && data.price !== undefined ? data.price : pet?.price,
          description: `${data.description !== '' && data.description !== undefined ? data.description : pet?.description}`,
          availability: data.availability
        }
      }).then(() => {
        return response.status(200).json({ message: 'Produto atualizado com sucesso!' })
      })
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Erro interno do servidor.' })
    }
  },

  async delete(request: Request, response: Response) {
    await prismaClient.$connect();
    const { id } = request.params;

    await prismaClient.pets.delete({
      where: { id }
    }).then(() => {
      return response.status(200).json({ message: 'Produto deletado com sucesso!' });
    }).catch((err) => {
      console.log(err);
      return response.status(500).json({ message: 'Erro interno do servidor, tente novamente mais tarde.' });
    })
  },
}