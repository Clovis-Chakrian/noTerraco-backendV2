import ImageKit from "imagekit";
import imageKit from "../../config/imagekit";
import { UploadResponse } from "imagekit/dist/libs/interfaces";
import removeSpecialCharacters from "../../utils/removeSpecialCharacters";
import { GenericReturnDto } from "../../dtos/generics/GenericReturnDto";

export class ImageService {
  private ImageKitService: ImageKit;

  constructor() {
    this.ImageKitService = imageKit;
  };


  async upload(file: Express.Multer.File, fileName: string, folder: string) {
    const uploadResponse = await this.ImageKitService.upload({
      file: file.buffer,
      fileName: removeSpecialCharacters(fileName),
      folder: removeSpecialCharacters(folder),
      useUniqueFileName: false
    })
    .then((response: UploadResponse) => {
      const fileData = {
        fileId: response.fileId,
        fileUrl: response.url
      };

      return new GenericReturnDto(true, fileData, [])
    })
    .catch((errors) => {
      const uploadReturn = new GenericReturnDto(true, null, [errors])
      console.error(uploadReturn);

      return uploadReturn;
    });

    return uploadResponse;
  };
}