import { Request, Response, NextFunction } from 'express';
import prismaClient from '../database/prismaClient';
import adminsView from '../views/admins_view';
import md5 from 'md5';
import * as Yup from 'yup';


export default {
  async create(req: Request, res: Response) {
    await prismaClient.$connect()

    const {
      name,
      password,
      accountType
    } = req.body as {
      name: string,
      password: string,
      accountType: string
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      password: Yup.string().required(),
      accountType: Yup.string().required(),
    });

    const encryptedPassword = md5(password)

    const admin = {
      name,
      password: encryptedPassword,
      accountType
    }

    await schema.validate(admin, {
      abortEarly: false
    });

    await prismaClient.admin.create({
      data: admin
    });

    return res.status(200).json({ message: 'Admin criado com sucesso' });
  },

  async index(request: Request, response: Response) {
    await prismaClient.$connect();

    const admins = await prismaClient.admin.findMany();

    return response.json(adminsView.renderMany(admins));
  },

  async show(request: Request, response: Response) {
    await prismaClient.$connect();
    const { id } = request.params;

    try {
      const admin = await prismaClient.admin.findUnique({
        where: {
          id
        }
      });

      return response.json(admin ? adminsView.render(admin) : { message: 'Usuário não encontrado' });
    } catch (error) {
      console.log(error);
      return response.status(400).json({ message: 'Usuário não encontrado' });
    }
  },

  async login(request: Request, response: Response) {
    await prismaClient.$connect();

    const {
      userName,
      password
    } = request.query as {
      userName: string,
      password: string
    };

    try {
      const admin = await prismaClient.admin.findFirst({
        where: {
          name: userName
        }
      })

      if (admin?.password !== md5(`${password}`)) return response.status(401).json({ message: 'Usuário ou senha incorretos' });

      return response.status(200).json(adminsView.render(admin));
    } catch (error) {
      console.log(error)
      return response.status(400).json({ message: 'Usuário ou senha incorretos' });
    }
  },

  async update(request: Request, response: Response) {
    await prismaClient.$connect()
    const { oldPassword } = request.query;
    const { newPassword, newName } = request.body;
    const { id } = request.params;

    try {
      const admin = await prismaClient.admin.findUnique({
        where: {
          id
        }
      });

      if (md5(`${oldPassword}`) !== admin?.password) return response.status(401).json({ message: 'Senha antiga incorreta' });

      await prismaClient.admin.update({
        where: {
          id
        },
        data: {
          name: newName !== '' && newName !== undefined ? newName : admin.name,
          password: newPassword !== '' && newPassword !== undefined ? md5(newPassword) : admin.password
        }
      });

      return response.status(200).json({ message: 'Dados atualizados com sucesso' });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  async authenticate(request: Request, response: Response, next: NextFunction) {
    await prismaClient.$connect()
    const {
      userName,
      password
    } = request.query as {
      userName: string,
      password: string
    };

    try {
      const admin = await prismaClient.admin.findFirst({
        where: { name: userName }
      });

      if (admin?.password !== md5(`${password}`)) return response.status(401).json({ message: 'Usuário ou senha incorretos' });

      next()
    } catch (error) {
      console.log(error)
      return response.status(400).json({ message: 'Usuário ou senha incorretos' });
    }
  }
};