import express, { response } from "express";
import AdminsController from "../controllers/AdminsController";
import PetsController from "../controllers/PetsController";

const petsRoutes = express.Router();

petsRoutes.post('/pet', PetsController.create);
petsRoutes.put('/pet/:id', PetsController.update);
petsRoutes.get('/pets', PetsController.index);
petsRoutes.get('/pet/:id', PetsController.show);
petsRoutes.delete('/pet/:id', PetsController.delete);

export default petsRoutes;