import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';
import { UserService } from './user.service';
import { City } from '../city/city.entity';
import { JwtCustomService } from '../auth/jwtCustom.service';

@Module({
  imports: [SequelizeModule.forFeature([User, City])],
  controllers: [UserController],
  providers: [UserRepository, UserService, JwtCustomService],
  exports: [UserRepository],
})
export class UserModule {}
