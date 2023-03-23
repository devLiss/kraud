import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/user.entity';
import { JwtCustomService } from './jwtCustom.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, SequelizeModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, JwtCustomService],
  exports: [JwtCustomService],
})
export class AuthModule {}
