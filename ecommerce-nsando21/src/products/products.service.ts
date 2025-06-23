import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Categories } from '../categories/entities/category.entity';
import * as data from '../data/data.json';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Categories)
    private readonly categoryRepository: Repository<Categories>,
  ) {}

  async create(): Promise<string> {
    const categories: Categories[] = await this.categoryRepository.find();

    const products: Product[] = data.map((element) => {
      const category: Categories | undefined = categories.find(
        (category) => element.category == category.name,
      );
      const newProduct = new Product();
      newProduct.name = element.name;
      newProduct.description = element.description;
      newProduct.price = element.price;
      newProduct.imgUrl = element?.imgUrl;
      newProduct.stock = element.stock;
      newProduct.category = category!; // Agregamos un objeto Categories{id,name}

      return newProduct;
    });
    await this.productsRepository.upsert(products, ['name']);

    return 'Products Added';
  }

  async findAll() {
    return await this.productsRepository.find({
      relations: {
        category: true,
      },
    });
  }

  async update(id: string, updateProductDto: Partial<Product>) {
    if (!id) {
      throw new Error('Product ID is required for update');
    }

    if (!updateProductDto || Object.keys(updateProductDto).length === 0) {
      throw new Error('Update data is required');
    }
    // Revisar si el producto existe
    const existingProduct = await this.productsRepository.findOne({
      where: { id },
      relations: { category: true },
    });

    if (!existingProduct) {
      throw new Error(`Product with ID ${id} not found`);
    }

    return this.productsRepository.update(id, updateProductDto).then(() => {
      return this.productsRepository.findOne({
        where: { id },
        relations: { category: true },
      });
    });
  }

  async findOne(id: string) {
    if (!id) {
      throw new Error('Se necesita el ID del producto');
    }

    const product = await this.productsRepository.findOne({
      where: { id },
      relations: { category: true },
    });

    if (!product) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }

    return product;
  }

  async createProduct(createProductDto: Partial<Product>) {
    if (!createProductDto) {
      throw new Error('Product data is required for creation');
    }

    if (!createProductDto.name || !createProductDto.price) {
      throw new Error('Product name and price are required');
    }

    if (createProductDto.category) {
      const category = await this.categoryRepository.findOne({
        where: { id: createProductDto.category.id },
      });

      if (!category) {
        throw new Error(
          `Category with ID ${createProductDto.category.id} not found`,
        );
      }

      createProductDto.category = category;
    }

    // Verificar si el producto ya existe
    const existingProduct = await this.productsRepository.findOne({
      where: { name: createProductDto.name },
    });

    if (existingProduct) {
      throw new Error(
        `El producto con nombre ${createProductDto.name} ya existe`,
      );
    }
    const newProduct = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(newProduct);
  }
}
