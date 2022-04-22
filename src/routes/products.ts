import express from "express";
import AdminsController from "../controllers/AdminsController";
import ProductsController from "../controllers/ProductsController";

const productsRoutes = express.Router();

productsRoutes.post('/product', ProductsController.create)
productsRoutes.get('/products', ProductsController.index);
productsRoutes.get('/product/:id', ProductsController.show);
productsRoutes.put('/product/:id', AdminsController.authenticate, ProductsController.update);
productsRoutes.delete('/product/:id', AdminsController.authenticate, ProductsController.delete);

export default productsRoutes;