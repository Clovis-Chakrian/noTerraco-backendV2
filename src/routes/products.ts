import express, { response } from "express";
import AdminsController from "../controllers/AdminsController";
import ProductsController from "../controllers/ProductsController";
import WinesController from "../controllers/WinesController";

const productsRoutes = express.Router();

productsRoutes.post('/product', ProductsController.create)
productsRoutes.get('/products', ProductsController.index);
productsRoutes.get('/product/:id', ProductsController.show);
productsRoutes.put('/product/:id', AdminsController.authenticate, ProductsController.update);
productsRoutes.delete('/product/:id', AdminsController.authenticate, ProductsController.delete);

productsRoutes.post('/wine', WinesController.create);
productsRoutes.get('/wines', WinesController.index);
productsRoutes.get('/', WinesController.test);
export default productsRoutes;