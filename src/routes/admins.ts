import express from "express";
import AdminsController from "../controllers/AdminsController";

const adminRoutes = express.Router();

// Rotas dos admins
adminRoutes.post('/signup', AdminsController.create);

//adminRoutes.get('/list-admins', AdminsController.index);
adminRoutes.get('/login', AdminsController.login);
adminRoutes.get('/admin/:id', AdminsController.show)

adminRoutes.put('/admin/:id', AdminsController.update);

export default adminRoutes;