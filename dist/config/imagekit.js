"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const imagekit_1 = __importDefault(require("imagekit"));
const imageKit = new imagekit_1.default({
    publicKey: `${process.env.IMAGEKIT_PUBLIC_KEY}`,
    privateKey: `${process.env.IMAGEKIT_PRIVATE_KEY}`,
    urlEndpoint: `${process.env.IMAGEKIT_URL_ENDPOINT}`
});
exports.default = imageKit;
