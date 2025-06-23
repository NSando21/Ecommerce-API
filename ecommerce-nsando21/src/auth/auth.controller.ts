import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDTO } from 'src/users/dtos/users.dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  signIn(@Body() credentials: LoginDTO) {
    return this.authService.signIn(credentials);
  }

  @Post('/signup') // "localhost:3000/auth/signup"
  createUser(@Body() user: CreateUserDto) {
    return this.authService.createUser(user);
  }
}
