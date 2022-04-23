"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminsController_1 = __importDefault(require("../controllers/AdminsController"));
const ProductsController_1 = __importDefault(require("../controllers/ProductsController"));
const productsRoutes = express_1.default.Router();
productsRoutes.post('/product', ProductsController_1.default.create);
productsRoutes.get('/products', ProductsController_1.default.index);
productsRoutes.get('/product/:id', ProductsController_1.default.show);
productsRoutes.put('/product/:id', AdminsController_1.default.authenticate, ProductsController_1.default.update);
productsRoutes.delete('/product/:id', AdminsController_1.default.authenticate, ProductsController_1.default.delete);
exports.default = productsRoutes;
