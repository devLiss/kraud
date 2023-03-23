import { Injectable } from '@nestjs/common';
import jwt, { verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class JwtCustomService {
  private secret;
  private refreshSecret;
  constructor(private configService: ConfigService) {
    this.secret =
      configService.get('JWT_SECRET', { infer: true }) || 'test_secret';
    this.refreshSecret =
      configService.get('JWT_REFRESH_SECRET', { infer: true }) ||
      'test_refresh_secret';
  }
  async generateTokens(userId: any) {
    const token = jwt.sign({ userId: userId }, this.secret, {
      expiresIn: '10h',
    });
    const refreshToken = jwt.sign({ userId: userId }, this.refreshSecret, {
      expiresIn: '20h',
    });

    return {
      accessToken: token,
      refreshToken: refreshToken,
    };
  }
  async getUserByAccessToken(token: string) {
    try {
      const result: any = jwt.verify(token, this.secret);
      return result.userId;
    } catch (e) {
      return null;
    }
  }
  async getPayloadByRefreshToken(refreshToken: string): Promise<any> {
    try {
      const result: any = jwt.verify(refreshToken, this.refreshSecret);
      return result;
    } catch (e) {
      return null;
    }
  }
  async getUserByRefreshToken(refreshToken: string) {
    try {
      const result: any = jwt.verify(refreshToken, this.refreshSecret);
      return result.userId;
    } catch (e) {
      return null;
    }
  }
  async _generateHash(password: string, passwHash) {
    const result = await bcrypt.compare(password, passwHash);
    return result;
  }
}
