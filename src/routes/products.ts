import express, { response } from "express";
import multer from "multer";
import multerConfig from "../config/multerConfig";
// import AdminsController from "../controllers/AdminsController";
import ProductsController from "../controllers/ProductsController";
import WinesController from "../controllers/WinesController";

const upload = multer(multerConfig);

const productsRoutes = express.Router();

productsRoutes.post('/product', upload.single('image'), ProductsController.create)
productsRoutes.get('/products', ProductsController.index);
productsRoutes.get('/product/:id', ProductsController.show);
productsRoutes.patch('/product/:id', upload.single('image'), ProductsController.update);
productsRoutes.delete('/product/:id', ProductsController.delete);

productsRoutes.post('/wine', WinesController.create);
productsRoutes.get('/wines', WinesController.index);
productsRoutes.get('/wine/:id', WinesController.show);
productsRoutes.put('/wine/:id', WinesController.update);
productsRoutes.delete('/wine/:id', WinesController.delete);

export default productsRoutes;