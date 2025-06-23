import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { FileUploadRepository } from './file-upload.repository';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly fileUploadRepository: FileUploadRepository, // Asegúrate de que FileUploadRepository esté importado correctamente
  ) {}
  async uploadImage(file: Express.Multer.File, productId: string) {
    const product = await this.productsRepository.findOneBy({
      id: productId,
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Si se encuentra el producto, debemos hacer la solicitud a CLOUDINARY
    // Dentro de un servicio NO deberia de llamar de forma directa a una fuente externa de informacion, por lo que deberia de llamar un repository
    const uploadResponse = await this.fileUploadRepository.uploadImage(file);

    await this.productsRepository.update(productId, {
      imgUrl: uploadResponse.secure_url,
    });

    const updatedProduct = await this.productsRepository.findOneBy({
      id: productId,
    });
    return updatedProduct;
  }
}
