import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/createUser.dto';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { User } from '../../common/decorators/user.decorator';
import { BearerAuthGuard } from '../../common/guards/bearerAuth.guard';
import { Response } from 'express';
import { RefreshToken } from '../../common/decorators/cookie.decorator';
import { JwtService } from './jwt.service';
import { LocalAuthGuard } from '../../common/guards/localAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService, private jwtService: JwtService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginDto,
    @User() user,
  ) {
    const tokens = await this.service.login(user);
    if (!tokens) {
      throw new UnauthorizedException();
    }
    res.cookie('refreshToken', tokens.refreshToken, {
      secure: true,
      httpOnly: true,
    });

    return { accessToken: tokens.accessToken };
  }

  @Post('registration')
  registration(@Body() dto: CreateUserDto) {
    return this.service.registration(dto);
  }

  @Post('refresh-token')
  @HttpCode(200)
  async refresh(
    @RefreshToken() refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.service.refreshToken(refreshToken);
    if (!tokens) {
      throw new UnauthorizedException();
    }
    res.cookie('refreshToken', tokens.refreshToken, {
      secure: true,
      httpOnly: true,
    });
    return {
      accessToken: tokens.accessToken,
    };
  }

  @Post('logout')
  @HttpCode(204)
  async logout(
    @RefreshToken() refreshToken,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const payload = await this.jwtService.getPayloadByRefreshToken(
      refreshToken,
    );
    if (!payload) {
      throw new UnauthorizedException();
    }
    res.clearCookie('refreshToken');
  }
}
