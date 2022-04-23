"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../database/prismaClient"));
const admins_view_1 = __importDefault(require("../views/admins_view"));
const md5_1 = __importDefault(require("md5"));
const Yup = __importStar(require("yup"));
exports.default = {
    async create(req, res) {
        await prismaClient_1.default.$connect();
        const { name, password, accountType } = req.body;
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            password: Yup.string().required(),
            accountType: Yup.string().required(),
        });
        const encryptedPassword = (0, md5_1.default)(password);
        const admin = {
            name,
            password: encryptedPassword,
            accountType
        };
        await schema.validate(admin, {
            abortEarly: false
        });
        await prismaClient_1.default.admin.create({
            data: admin
        });
        return res.status(200).json({ message: 'Admin criado com sucesso' });
    },
    async index(request, response) {
        await prismaClient_1.default.$connect();
        const admins = await prismaClient_1.default.admin.findMany();
        return response.json(admins_view_1.default.renderMany(admins));
    },
    async show(request, response) {
        await prismaClient_1.default.$connect();
        const { id } = request.params;
        try {
            const admin = await prismaClient_1.default.admin.findUnique({
                where: {
                    id
                }
            });
            return response.json(admin ? admins_view_1.default.render(admin) : { message: 'Usuário não encontrado' });
        }
        catch (error) {
            console.log(error);
            return response.status(400).json({ message: 'Usuário não encontrado' });
        }
    },
    async login(request, response) {
        await prismaClient_1.default.$connect();
        const { userName, password } = request.query;
        try {
            const admin = await prismaClient_1.default.admin.findFirst({
                where: {
                    name: userName
                }
            });
            if ((admin === null || admin === void 0 ? void 0 : admin.password) !== (0, md5_1.default)(`${password}`))
                return response.status(401).json({ message: 'Usuário ou senha incorretos' });
            return response.status(200).json(admins_view_1.default.render(admin));
        }
        catch (error) {
            console.log(error);
            return response.status(400).json({ message: 'Usuário ou senha incorretos' });
        }
    },
    async update(request, response) {
        await prismaClient_1.default.$connect();
        const { oldPassword } = request.query;
        const { newPassword, newName } = request.body;
        const { id } = request.params;
        try {
            const admin = await prismaClient_1.default.admin.findUnique({
                where: {
                    id
                }
            });
            if ((0, md5_1.default)(`${oldPassword}`) !== (admin === null || admin === void 0 ? void 0 : admin.password))
                return response.status(401).json({ message: 'Senha antiga incorreta' });
            await prismaClient_1.default.admin.update({
                where: {
                    id
                },
                data: {
                    name: newName !== '' && newName !== undefined ? newName : admin.name,
                    password: newPassword !== '' && newPassword !== undefined ? (0, md5_1.default)(newPassword) : admin.password
                }
            });
            return response.status(200).json({ message: 'Dados atualizados com sucesso' });
        }
        catch (error) {
            console.log(error);
            return response.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
    async authenticate(request, response, next) {
        await prismaClient_1.default.$connect();
        const { userName, password } = request.query;
        try {
            const admin = await prismaClient_1.default.admin.findFirst({
                where: { name: userName }
            });
            if ((admin === null || admin === void 0 ? void 0 : admin.password) !== (0, md5_1.default)(`${password}`))
                return response.status(401).json({ message: 'Usuário ou senha incorretos' });
            next();
        }
        catch (error) {
            console.log(error);
            return response.status(400).json({ message: 'Usuário ou senha incorretos' });
        }
    }
};
