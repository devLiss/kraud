import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { City } from './city.entity';
import { CityService } from './city.service';
import { CityRepository } from './city.repository';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { CheckCityValidator } from '../../common/validators/checkCity.validator';

@Module({
  imports: [UserModule, AuthModule, SequelizeModule.forFeature([City])],
  controllers: [CityController],
  providers: [CityService, CityRepository, CheckCityValidator],
})
export class CityModule {}
