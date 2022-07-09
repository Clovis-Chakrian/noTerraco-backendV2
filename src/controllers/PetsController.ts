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
    } = request.body;

    const { id } = request.params;

    const data = {
      name,
      price,
      description,
      availability
    };
  },

  async delete(request: Request, response: Response) { },
}