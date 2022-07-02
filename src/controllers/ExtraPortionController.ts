import { Request, Response } from 'express';
import { object, string, number, boolean, ValidationError } from 'yup';
import prismaClient from '../database/prismaClient';

export default {
  async create(request: Request, response: Response) {},

  async index(request: Request, response: Response) {},

  async show(request: Request, response: Response) {},

  async update(request: Request, response: Response) {},

  async delete(request: Request, response: Response) {},
}