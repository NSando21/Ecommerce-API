import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si no hay roles requeridos, permite el acceso
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const user = request.user;

    // Si no hay usuario autenticado o no tiene roles, deniega el acceso
    if (!user || !user.role) {
      return false;
    }

    // Si user.role es un string, conviértelo a array para soportar múltiples roles
    const userRoles = Array.isArray(user.role) ? user.role : [user.role];

    // Retorna true si al menos uno de los roles requeridos está en los roles del usuario
    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
