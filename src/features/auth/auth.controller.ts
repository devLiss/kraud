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
import { Response } from 'express';
import { RefreshToken } from '../../common/decorators/cookie.decorator';
import { JwtCustomService } from './jwtCustom.service';
import { LocalAuthGuard } from '../../common/guards/localAuth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginView } from '../viewModels/login.view';
import { ApiErrorsResultView } from '../viewModels/ApiErrorsResult.view';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private service: AuthService,
    private jwtService: JwtCustomService,
  ) {}

  @ApiOperation({ summary: 'Try login user to system' })
  @ApiResponse({ status: 200, description: '' })
  @ApiResponse({
    status: 400,
    description: 'If the inputModel has incorrect values',
    type: ApiErrorsResultView,
  })
  @ApiResponse({
    status: 401,
    description: 'If the password or login is wrong',
  })
  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginDto,
  ) {
    const tokens = await this.service.login(dto);
    if (!tokens) {
      throw new UnauthorizedException();
    }
    res.cookie('refreshToken', tokens.refreshToken, {
      secure: true,
      httpOnly: true,
    });

    return { accessToken: tokens.accessToken };
  }

  @ApiOperation({ summary: 'Registration' })
  @ApiResponse({ status: 201, description: 'Input data is accepted.' })
  @ApiResponse({
    status: 400,
    description: 'If the inputModel has incorrect values',
    type: ApiErrorsResultView,
  })
  @Post('registration')
  registration(@Body() dto: CreateUserDto) {
    return this.service.registration(dto);
  }

  @ApiOperation({
    summary:
      'Generate new pair of access and refresh tokens (in cookie client must send correct refreshToken) ',
  })
  @ApiResponse({
    status: 200,
    description: `Returns JWT accessToken (expired after 10 seconds) in 
  body and JWT refreshToken in cookie (http-only, secure) (expired after 20 seconds).`,
    type: LoginView,
  })
  @ApiResponse({
    status: 401,
    description: `If the JWT refreshToken inside cookie is missing, expired or incorrect`,
  })
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

  @ApiOperation({ summary: 'Logout and clear cookies' })
  @ApiResponse({ status: 204, description: 'No content' })
  @ApiResponse({
    status: 401,
    description:
      'If the JWT refreshToken inside cookie is missing, expired or incorrect',
  })
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
