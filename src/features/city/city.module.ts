import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Country } from './city.entity';
import { CityService } from './city.service';

@Module({
  controllers: [CityController],
  imports: [SequelizeModule.forFeature([Country])],
  providers: [CityService],
})
export class CityModule {}
