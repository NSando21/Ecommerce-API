import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
//import { Request } from 'express';
import { Observable } from 'rxjs';
import { Role } from 'src/roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;

    const authorization = headers.authorization; //"Bearer token"

    if (!authorization) return false;

    const token = authorization.split(' ')[1]; //[Ahora aqui se opbtiene el token]

    if (!token) return false;

    const secret = process.env.JWE_SECRET;
    try {
      const user = this.jwtService.verify(token, { secret }); // ==> payload{} , si falla => throw new Error('Invalid token');

      if (user.isAdmin) {
        user.role = [Role.Admin];
      } else {
        user.role = [Role.User];
      }

      user.exp = new Date(user.exp * 1000); // Convertir la fecha de expiración a milisegundos,esta en horario UTC
      user.iat = new Date(user.iat * 1000); // Convertir la fecha de emisión a milisegundos, esta en horario UTC

      request.user = user;

      console.log(user);
      // Esto nos devuelve el payload del token (es decir, el usuario), si el token es valido
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return false;
    }
  }
}
