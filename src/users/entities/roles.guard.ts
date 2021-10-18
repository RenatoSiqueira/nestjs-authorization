import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { User } from './user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    // const { user } = context.switchToHttp().getRequest();

    if (!requireRoles) {
      return true;
    }

    const user: User = {
      name: 'Renato',
      roles: [Role.USER],
    };
    console.log(requireRoles, user);
    // return true;
    return requireRoles.some((role) => user.roles.includes(role));
  }
}
