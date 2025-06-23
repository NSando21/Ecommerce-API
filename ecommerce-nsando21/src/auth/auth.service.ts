import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, LoginDTO } from 'src/users/dtos/users.dtos';
import { User as Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly jwtService: JwtService, // Asegúrate de importar JwtService desde @nestjs/jwt
  ) {}

  async signIn(credentials: LoginDTO) {
    const findUser: Users | null = await this.usersRepository.findOneBy({
      email: credentials.email,
    });
    if (!findUser) {
      throw new BadRequestException('Bad credentials');
    }

    const passwordMatch = await bcrypt.compare(
      credentials.password,
      findUser.password, // Comparamos la contraseña ingresada con la hasheada en la DB
    );

    if (!passwordMatch) {
      throw new BadRequestException('Bad credentials');
    }

    const payload = {
      id: findUser.id,
      email: findUser.email,
      isAdmin: findUser.isAdmin,
    };
    const token = this.jwtService.sign(payload);

    return token;
  }

  async createUser(user: CreateUserDto) {
    const findUser = await this.usersRepository.findOneBy({
      email: user.email,
    });

    if (findUser) {
      throw new BadRequestException('Usuario ya registrado con anterioridad');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = this.usersRepository.create({
      ...user,
      password: hashedPassword, // Guardamos la contraseña hasheada
    }); // Creamos una instancia de Users({})

    const createdUser = await this.usersRepository.save(newUser);

    // Que calle el eslint -:c

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = createdUser;

    return userWithoutPassword;
  }
}
