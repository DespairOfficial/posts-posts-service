import { accessTokenOptions } from '../../config/jwtOptions';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { NOT_AUTHORIZED, NOT_AUTHORIZED_OR_BAD_TOKEN } from '../../config/constants';
import { User } from '../../interfaces/user.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    try {
      const authHeader = req.headers.authorization.split(' ');
      const bearer = authHeader[0];
      const token = authHeader[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: NOT_AUTHORIZED });
      }
      const user: User = this.jwtService.verify(token, {
        secret: accessTokenOptions.secret,
      });
      req.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException({ message: NOT_AUTHORIZED_OR_BAD_TOKEN });
    }
  }
}
