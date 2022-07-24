import { Request, Response } from 'express';
import { deleteFile, updateImages, uploadImage } from '../services/imageKit';
import { object, string, number, boolean, ValidationError } from 'yup';
import prismaClient from '../database/prismaClient';
import removeSpecialCharacters from '../utils/removeSpecialCharacters';

export default {
  async create(request: Request, response: Response) {},

  async index(request: Request, response: Response) {},

  async show(request: Request, response: Response) {},

  async update(request: Request, response: Response) {},

  async delete(request: Request, response: Response) {},
}