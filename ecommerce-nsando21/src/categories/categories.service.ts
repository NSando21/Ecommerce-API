import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categories } from '././entities/category.entity';
import * as data from '../data/data.json';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoryRepository: Repository<Categories>,
  ) {}

  async create() {
    // Aqui se tiene que ejecutar el seeder
    // Los sets son listas donde se actualizan los valores repetidos
    const categoriesNames = new Set(data.map((element) => element.category));
    const categoriesArray = Array.from(categoriesNames);

    const categories = categoriesArray.map((category) => ({ name: category }));
    //El metodo upsert trata de agregar un registro en la DB utilizando como parametro una propiedad
    //En este caso dentro de la tabla categories va a buscar una propiedad 'Name' e intentar actualizarla o agregarla en caso de no existir
    await this.categoryRepository.upsert(categories, ['name']);

    return 'This action adds a new category';
  }

  async findAll(): Promise<Categories[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: string): Promise<Categories | null> {
    return this.categoryRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }

  // Métodos para seeder
  async getCategories(): Promise<Categories[]> {
    return this.categoryRepository.find();
  }

  async addCategories(
    categories: Partial<Categories>[],
  ): Promise<Categories[]> {
    const savedCategories: Categories[] = [];

    for (const categoryData of categories) {
      // Verificar si ya existe una categoría con el mismo nombre
      const existingCategory = await this.categoryRepository.findOne({
        where: { name: categoryData.name },
      });

      if (!existingCategory) {
        const newCategory = this.categoryRepository.create(categoryData);
        const savedCategory = await this.categoryRepository.save(newCategory);
        savedCategories.push(savedCategory);
      }
    }

    return savedCategories;
  }
}
