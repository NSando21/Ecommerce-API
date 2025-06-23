import { Injectable } from '@nestjs/common';
import { PaginationDto } from './dtos/pagination.dto';
import { Repository } from 'typeorm';
import { User as Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}
  async getUsers(paginationDto: PaginationDto): Promise<Users[]> {
    let users = await this.usersRepository.find();

    const { page = 1, limit = 10 } = paginationDto;
    const start = (page - 1) * limit;
    const end = start + limit;

    users = users.slice(start, end);

    return users;
  }

  async getUserById(id: string): Promise<Users> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { orders: true },
    });

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: Partial<Users>): Promise<Users> {
    if (!id) {
      throw new Error('User ID is required for update');
    }

    if (!updateUserDto || Object.keys(updateUserDto).length === 0) {
      throw new Error('Update data is required');
    }

    // Revisar si el usuario existe
    const existingUser = await this.usersRepository.findOne({
      where: { id },
      relations: { orders: true },
    });

    if (!existingUser) {
      throw new Error(`User with ID ${id} not found`);
    }

    // Si se envía una nueva contraseña, encríptala antes de guardar
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    // Actualizar los campos del usuario
    Object.assign(existingUser, updateUserDto);

    return await this.usersRepository.save(existingUser);
  }

  async delete(id: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    await this.usersRepository.remove(user);
  }
}
