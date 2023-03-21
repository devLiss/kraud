import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from '../../features/dto/login.dto';
import { JwtService } from '../../features/auth/jwt.service';
import { UserRepository } from '../../features/user/user.repository';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(
    private userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const loginDto: LoginDto = req.body;
    const user = await this.checkCreds(loginDto);
    if (!user) throw new UnauthorizedException();

    req.user = user;
    return true;
  }

  async checkCreds(loginDto) {
    const user = await this.userRepo.getByEmail(loginDto.email);
    if (!user) return null;
    const passwordHash = await this.jwtService._generateHash(
      loginDto.password,
      user.passwordHash,
    );
    if (!passwordHash) {
      return null;
    }
    return user;
  }
}
