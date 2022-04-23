"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admins_1 = __importDefault(require("./admins"));
const products_1 = __importDefault(require("./products"));
const routes = [admins_1.default, products_1.default];
exports.default = routes;
