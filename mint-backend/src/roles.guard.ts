import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
require("dotenv").config();

export const ADMIN      = 0b11111111111111111111; // 20 roles
export const MANAGER    = 0b00111111111111111111; // 18 roles
export const FREE       = 0b00000000000000000000; // 18 roles

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<number[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    if (roles.length > 0 && roles.indexOf(FREE) > -1) {
        return true;
    }
    const request = context.switchToHttp().getRequest();
    if (request.headers.requester === process.env.OWNER) {
        return true;
    } else {
        return false;
    }
  }
}
