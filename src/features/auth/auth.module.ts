import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/user.entity';
import { JwtService } from './jwt.service';

@Module({
  imports: [UserModule, SequelizeModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [JwtService],
})
export class AuthModule {}
