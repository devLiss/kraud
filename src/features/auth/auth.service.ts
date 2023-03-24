import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/createUser.dto';
import { UserRepository } from '../user/user.repository';
import * as bcrypt from 'bcrypt';
import { UserType } from '../../common/types/user.type';
import { JwtCustomService } from './jwtCustom.service';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtCustomService,
    private userRepository: UserRepository,
  ) {}

  async registration(dto: CreateUserDto) {
    const existedUser = await this.userRepository.getByEmail(dto.email);
    if (existedUser) {
      throw new BadRequestException([
        {
          message: 'Пользователь с таким email уже существует',
          field: 'email',
        },
      ]);
    }

    const passwd: string = await bcrypt.genSalt();
    const passwdHash: string = await bcrypt.hash(dto.password, passwd);

    const user: UserType = {
      name: dto.name,
      email: dto.email,
      passwordHash: passwdHash,
    };
    return this.userRepository.create(user);
  }

  async login(dto: LoginDto) {
    const user = await this.userRepository.getByEmail(dto.email);
    if (!user) {
      return null;
    }
    const tokens = await this.jwtService.generateTokens(user.id);

    if (!tokens) {
      return null;
    }

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    const payload = await this.jwtService.getPayloadByRefreshToken(
      refreshToken,
    );
    if (!payload) {
      return null;
    }
    const tokens = await this.jwtService.generateTokens(payload.userId);
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
