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
const products_view_1 = __importDefault(require("../views/products_view"));
const imageKit_1 = require("../services/imageKit");
const Yup = __importStar(require("yup"));
const prismaClient_1 = __importDefault(require("../database/prismaClient"));
//the normalize function does not work when i used, so i made this
function removeSpecialCharacters(text) {
    text = text.toLowerCase();
    text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
    text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
    return text;
}
;
exports.default = {
    async create(request, response) {
        await prismaClient_1.default.$connect();
        const { name, type, subtype, description, memory, image, price, availability } = request.body;
        const schema = Yup.object().shape({
            name: Yup.string().required('O campo nome é requerido.'),
            type: Yup.string().required('O campo tipo é requerido.'),
            subtype: Yup.string(),
            description: Yup.string().notRequired(),
            memory: Yup.string(),
            imageUrl: Yup.string().notRequired(),
            price: Yup.string().required('O campo preço é requerido.'),
            availability: Yup.boolean().required()
        });
        const base64 = image.replace(/^data:image\/jpeg;base64,/, "");
        const fileName = `${removeSpecialCharacters(name.replaceAll(' ', '_'))}`;
        if (type == 'Porções extras') {
            const product = {
                name,
                type,
                subtype: 'sem subtipo para esse',
                description: 'sem descrição para esse',
                memory: 'sem lembrança para esse',
                imageUrl: 'Sem imagem para esse',
                price: Number(price),
                availability,
                priceForTwo: Number(price) + Number(price) * 0.7,
                updateTimes: 1
            };
            await schema.validate(product, {
                abortEarly: false
            }).catch((err) => {
                return response.status(400).json(err.errors);
            });
            //await productsRepository.save(product);
            await prismaClient_1.default.product.create({
                data: product
            });
            return response.status(201).json({ message: 'Produto criado com sucesso!' });
        }
        const product = {
            name,
            type,
            subtype,
            description,
            memory,
            imageUrl: fileName,
            price: Number(price),
            availability,
            priceForTwo: Number(price) + Number(price) * 0.7,
            updateTimes: 1
        };
        await schema.validate(product, {
            abortEarly: false
        }).catch((err) => {
            return response.status(400).json(err.errors);
        });
        (0, imageKit_1.uploadImage)(base64, `${fileName}_${product.updateTimes}`, '/pratos');
        await prismaClient_1.default.product.create({
            data: product
        });
        return response.status(201).json({ message: 'Produto criado com sucesso!' });
    },
    async index(request, response) {
        await prismaClient_1.default.$connect();
        const { name, type } = request.query;
        if (name) {
            try {
                const product = await prismaClient_1.default.product.findMany({
                    where: { name, type }
                });
                return response.status(200).json(products_view_1.default.renderMany(product));
            }
            catch (error) {
                console.log(error);
                return response.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
        else {
            try {
                const products = await prismaClient_1.default.product.findMany({
                    where: { type }
                });
                return response.status(200).json(products_view_1.default.renderMany(products));
            }
            catch (error) {
                console.log(error);
                return response.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
        ;
    },
    async show(request, response) {
        await prismaClient_1.default.$connect();
        const { id } = request.params;
        try {
            const product = await prismaClient_1.default.product.findUnique({
                where: { id }
            });
            return response.status(200).json(product ? products_view_1.default.render(product) : { message: "Produto não encontrado." });
        }
        catch (error) {
            console.log(error);
            return response.status(500).json({ message: 'Erro interno do servidor' });
        }
        ;
    },
    async update(request, response) {
        await prismaClient_1.default.$connect();
        const { name, type, subtype, description, memory, image, price, availability } = request.body;
        const { id } = request.params;
        if (request.body === undefined)
            return response.status(400).json({ message: 'Não foi passado nenhum dado para ser atualizado' });
        const data = {
            name,
            type,
            subtype,
            description,
            memory,
            price: Number(price),
            availability
        };
        try {
            const product = await prismaClient_1.default.product.findUnique({
                where: { id }
            });
            if (product) {
                if (image !== '' && image !== undefined) {
                    const base64 = image.replace(/^data:image\/jpeg;base64,/, "");
                    const fileName = removeSpecialCharacters(product.name.replace(/ /g, '_'));
                    const newImgName = data.name ? removeSpecialCharacters(data.name.replace(/ /g, '_')) : console.log('sem novos nomes');
                    (0, imageKit_1.updateImages)(`${fileName}_${product.updateTimes}`, base64, `${data.name !== '' && data.name !== undefined ? newImgName : fileName}_${product.updateTimes + 1}`, `pratos`);
                }
                ;
                const newImgName = data.name ? removeSpecialCharacters(data.name.replace(/ /g, '_')) : console.log('sem novos nomes');
                await prismaClient_1.default.product.update({
                    where: { id },
                    data: {
                        name: `${data.name !== '' && data.name !== undefined ? data.name : product.name}`,
                        type: `${data.type !== '' && data.type !== undefined ? data.type : product.type}`,
                        subtype: `${data.subtype !== '' && data.subtype !== undefined ? data.subtype : product.subtype}`,
                        imageUrl: `${data.name !== '' && data.name !== undefined && image !== '' && image !== undefined ? newImgName : product.imageUrl}`,
                        description: `${data.description !== '' && data.description !== undefined ? data.description : product.description}`,
                        memory: `${data.memory !== '' && data.memory !== undefined ? data.memory : product.memory}`,
                        price: data.price !== 0 ? data.price : product.price,
                        availability: data.availability,
                        priceForTwo: data.price !== 0 ? data.price + data.price * 0.7 : product.priceForTwo,
                        updateTimes: image !== '' && image !== undefined ? product.updateTimes + 1 : product.updateTimes
                    }
                });
                return response.status(200).json({ message: 'Produto atualizado com sucesso!' });
            }
        }
        catch (error) {
            console.log(error);
            return response.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
    async delete(request, response) {
        await prismaClient_1.default.$connect();
        const { id } = request.params;
        try {
            const product = await prismaClient_1.default.product.findUnique({
                where: { id }
            });
            if (product) {
                await prismaClient_1.default.product.delete({
                    where: { id }
                }).then(() => {
                    const fileName = removeSpecialCharacters(product.name.replace(/ /g, '_'));
                    (0, imageKit_1.deleteFile)(`${fileName}_${product.updateTimes}`);
                }).catch(err => {
                    console.error(err);
                });
                return response.status(200).json({ message: `${product.name} deletado com sucesso!` });
            }
        }
        catch (error) {
            console.log(error);
            return response.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
};
