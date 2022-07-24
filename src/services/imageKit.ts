import imageKit from "../config/imagekit";

function uploadImage(base64: string, fileName: string, cdnFolder: string) {
  imageKit.upload({
    file: base64,
    fileName: fileName,
    useUniqueFileName: false,
    folder: cdnFolder
  }, function (error, result) {
    if (error) {
      console.log(error)
      return 'error';
    } else {
      return result.url;
    };
  });
};

async function updateImages(fileToDelete: string, base64: string, fileName: string, cdnFolder: string) {
  imageKit.listFiles({
    type: 'file',
    searchQuery: `name = ${fileToDelete}`
  }, async (error, result) => {
    if (error) console.log(error);

    result[0] ? await imageKit.deleteFile(result[0].fileId).then(async res => {
      await imageKit.purgeCache(result[0].url)
    }) : console.log('imagem nova');
  });

  imageKit.upload({
    file: base64,
    fileName: fileName,
    useUniqueFileName: false,
    folder: cdnFolder
  }, function (error, result) {
    if (error) {
      console.log(error)
      return 'error';
    } else {
      return result.url;
    };
  });
};

async function deleteFile(fileToDelete: string, path: string) {
  imageKit.listFiles({
    type: 'file',
    searchQuery: `name = ${fileToDelete}`,
    path: path
  }, async (error, result) => {
    if (error) console.log(error);

    result[0] ? await imageKit.deleteFile(result[0].fileId).then(async res => {
      await imageKit.purgeCache(result[0].url)
    }) : console.log('imagem nova');
  });
};

export { updateImages, uploadImage, deleteFile };