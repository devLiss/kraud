import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../../features/user/user.repository';
import { JwtService } from '../../features/auth/jwt.service';

@Injectable()
export class BearerAuthGuard implements CanActivate {
  constructor(
    private userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    if (!req.headers.authorization) {
      throw new UnauthorizedException();
    }
    const token = req.headers.authorization.split(' ')[1];

    const userId = await this.jwtService.getUserByAccessToken(token);
    if (!userId) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepo.getUserById(userId);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }
    req.user = user;
    return true;
  }
}
