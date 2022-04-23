"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.uploadImage = exports.updateImages = void 0;
const imagekit_1 = __importDefault(require("../config/imagekit"));
function uploadImage(base64, fileName, cdnFolder) {
    imagekit_1.default.upload({
        file: base64,
        fileName: fileName,
        useUniqueFileName: false,
        folder: cdnFolder
    }, function (error, result) {
        if (error) {
            console.log(error);
            return 'error';
        }
        else {
            return result.url;
        }
        ;
    });
}
exports.uploadImage = uploadImage;
;
async function updateImages(fileToDelete, base64, fileName, cdnFolder) {
    imagekit_1.default.listFiles({
        type: 'file',
        searchQuery: `name = ${fileToDelete}`
    }, async (error, result) => {
        if (error)
            console.log(error);
        result[0] ? await imagekit_1.default.deleteFile(result[0].fileId).then(async (res) => {
            await imagekit_1.default.purgeCache(result[0].url);
        }) : console.log('imagem nova');
    });
    imagekit_1.default.upload({
        file: base64,
        fileName: fileName,
        useUniqueFileName: false,
        folder: cdnFolder
    }, function (error, result) {
        if (error) {
            console.log(error);
            return 'error';
        }
        else {
            return result.url;
        }
        ;
    });
}
exports.updateImages = updateImages;
;
async function deleteFile(fileToDelete) {
    imagekit_1.default.listFiles({
        type: 'file',
        searchQuery: `name = ${fileToDelete}`
    }, async (error, result) => {
        if (error)
            console.log(error);
        result[0] ? await imagekit_1.default.deleteFile(result[0].fileId).then(async (res) => {
            await imagekit_1.default.purgeCache(result[0].url);
        }) : console.log('imagem nova');
    });
}
exports.deleteFile = deleteFile;
;
