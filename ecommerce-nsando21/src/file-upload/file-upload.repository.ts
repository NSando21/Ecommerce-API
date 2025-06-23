import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import * as toStream from 'buffer-to-stream'; // Transforma un buffer a un stream

@Injectable()
export class FileUploadRepository {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      // La funcion upload llama a la clase uploader, ejecuta el metodo upload_stream
      // y lo almacena en forma de una promesa en la libreria de cloudinary
      const upload = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
            reject(error);
          } else {
            resolve(result!);
          }
        },
      );

      toStream(file.buffer).pipe(upload);
    });
  }
}
