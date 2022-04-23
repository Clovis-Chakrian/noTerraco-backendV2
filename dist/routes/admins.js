"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminsController_1 = __importDefault(require("../controllers/AdminsController"));
const adminRoutes = express_1.default.Router();
// Rotas dos admins
adminRoutes.post('/signup', AdminsController_1.default.create);
//adminRoutes.get('/list-admins', AdminsController.index);
adminRoutes.get('/login', AdminsController_1.default.login);
adminRoutes.get('/admin/:id', AdminsController_1.default.show);
adminRoutes.put('/admin/:id', AdminsController_1.default.update);
exports.default = adminRoutes;
