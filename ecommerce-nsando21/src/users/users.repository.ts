import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/users.dtos';
import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  address: string;
  phone: number;
  country?: string;
  city?: string;
}

@Injectable()
export class UsersRepository {
  users: User[] = [
    {
      id: '1',
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: '123456',
      address: '123 Main St',
      phone: 555 - 1234,
      country: 'USA',
      city: 'New York',
    },
    {
      id: '2',
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      password: 'abcdef',
      address: '456 Elm St',
      phone: 555 - 5678,
      country: 'Canada',
      city: 'Toronto',
    },
  ];

  getUsers(page: number = 1, limit: number) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedUsers = this.users.slice(startIndex, endIndex);
    const totalUsers = this.users.length;
    const totalPages = Math.ceil(totalUsers / limit);

    return {
      data: paginatedUsers,
      currentPage: page,
      totalPages: totalPages,
      totalUsers: totalUsers,
    };
  }

  getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  createUser(userToCreate: CreateUserDto): User {
    const newUser = { ...userToCreate, id: uuidv4() };
    this.users.push(newUser);
    return newUser;
  }

  deleteUser(id: string): User {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    const [deletedUser] = this.users.splice(userIndex, 1);
    return deletedUser;
  }
}
